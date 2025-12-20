import * as fs from 'fs';

// PC2LINE 常量
const PC2LINE_BASE = -1;
const PC2LINE_RANGE = 5;
const PC2LINE_OP_FIRST = 1;
const PC2LINE_DIFF_PC_MAX = 50;

// 读取两个 qbc 文件
const tsData = fs.readFileSync('artifacts/closure-basic.ts.qbc');
const wasmData = fs.readFileSync('artifacts/closure-basic.wasm.qbc');

// 辅助函数: 读取 leb128
function readLeb128(buf: Buffer, pos: number): [number, number] {
  let result = 0;
  let shift = 0;
  let byte;
  let count = 0;
  do {
    byte = buf[pos + count];
    result |= (byte & 0x7f) << shift;
    shift += 7;
    count++;
  } while (byte & 0x80);
  return [result, count];
}

// 辅助函数: 读取 sleb128
function readSleb128(buf: Buffer, pos: number): [number, number] {
  let result = 0;
  let shift = 0;
  let byte;
  let count = 0;
  do {
    byte = buf[pos + count];
    result |= (byte & 0x7f) << shift;
    shift += 7;
    count++;
  } while (byte & 0x80);
  // 符号扩展
  if (shift < 32 && (byte & 0x40)) {
    result |= (~0 << shift);
  }
  return [result, count];
}

function decodePc2line(data: Uint8Array): void {
  console.log('  Raw bytes:', [...data].map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '));
  
  let pos = 0;
  
  // 读取初始行号列号
  let [initLine, len1] = readLeb128(Buffer.from(data), pos); pos += len1;
  let [initCol, len2] = readLeb128(Buffer.from(data), pos); pos += len2;
  console.log(`  Initial: line=${initLine}, col=${initCol}`);
  
  let currentPc = 0;
  let currentLine = initLine;
  let currentCol = initCol;
  
  while (pos < data.length) {
    const op = data[pos++];
    
    if (op === 0) {
      // 长编码
      let [diffPc, l1] = readLeb128(Buffer.from(data), pos); pos += l1;
      let [diffLine, l2] = readSleb128(Buffer.from(data), pos); pos += l2;
      let [diffCol, l3] = readSleb128(Buffer.from(data), pos); pos += l3;
      
      currentPc += diffPc;
      currentLine += diffLine;
      currentCol += diffCol;
      
      console.log(`  Long: diffPc=${diffPc}, diffLine=${diffLine}, diffCol=${diffCol} → pc=${currentPc}, line=${currentLine}, col=${currentCol}`);
    } else if (op >= PC2LINE_OP_FIRST) {
      // 短编码
      const val = op - PC2LINE_OP_FIRST;
      const diffLine = (val % PC2LINE_RANGE) + PC2LINE_BASE;
      const diffPc = Math.floor(val / PC2LINE_RANGE);
      
      let [diffCol, l3] = readSleb128(Buffer.from(data), pos); pos += l3;
      
      currentPc += diffPc;
      currentLine += diffLine;
      currentCol += diffCol;
      
      console.log(`  Short(0x${op.toString(16)}): diffPc=${diffPc}, diffLine=${diffLine}, diffCol=${diffCol} → pc=${currentPc}, line=${currentLine}, col=${currentCol}`);
    } else {
      console.log(`  Unknown op: 0x${op.toString(16)}`);
    }
  }
}

function analyzeBytecode(data: Buffer, name: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`=== ${name} 字节码分析 ===`);
  console.log(`${'='.repeat(60)}`);
  
  let pos = 0;
  
  // 1. 版本号
  const version = data[pos++];
  console.log(`\n[版本] ${version}`);
  
  // 2. 原子数量
  let [atomCount, len] = readLeb128(data, pos); pos += len;
  console.log(`[原子数量] ${atomCount}`);
  
  // 3. 跳过原子表
  for (let i = 0; i < atomCount; i++) {
    const [sizeInfo, l] = readLeb128(data, pos); pos += l;
    const byteLen = sizeInfo >> 1;
    const isWide = sizeInfo & 1;
    const bytesToSkip = isWide ? byteLen * 2 : byteLen;
    pos += bytesToSkip;
  }
  console.log(`[原子表结束] pos=${pos}`);
  
  // 4. 函数 tag
  const funcTag = data[pos++];
  console.log(`\n[函数 Tag] 0x${funcTag.toString(16)}`);
  
  // 5. 函数 flags (2 bytes)
  const flags = data[pos] | (data[pos+1] << 8);
  pos += 2;
  console.log(`[Flags] 0x${flags.toString(16)} (hasDebug=${(flags >> 10) & 1})`);
  
  // 6. js_mode
  const jsMode = data[pos++];
  
  // 7. func_name atom (leb128)
  let [nameAtom, nameLen] = readLeb128(data, pos); pos += nameLen;
  console.log(`[Func Name Atom] ${nameAtom}`);
  
  // 8. 各种 leb128 字段
  let [argCount, l1] = readLeb128(data, pos); pos += l1;
  let [varCount, l2] = readLeb128(data, pos); pos += l2;
  let [definedArgCount, l3] = readLeb128(data, pos); pos += l3;
  let [stackSize, l4] = readLeb128(data, pos); pos += l4;
  let [closureVarCount, l5] = readLeb128(data, pos); pos += l5;
  let [cpoolCount, l6] = readLeb128(data, pos); pos += l6;
  let [byteCodeLen, l7] = readLeb128(data, pos); pos += l7;
  
  console.log(`[函数参数] args=${argCount}, vars=${varCount}, stack=${stackSize}, closureVars=${closureVarCount}, cpool=${cpoolCount}, bcLen=${byteCodeLen}`);
  
  // 9. vardefs 长度
  let [vardefsLen, l8] = readLeb128(data, pos); pos += l8;
  
  // 跳过 vardefs
  for (let i = 0; i < vardefsLen; i++) {
    let [atom, la] = readLeb128(data, pos); pos += la;
    let [sl, ls] = readLeb128(data, pos); pos += ls;
    let [sn, ln] = readLeb128(data, pos); pos += ln;
    pos += 1; // flags
  }
  
  // 跳过 closure_vars
  for (let i = 0; i < closureVarCount; i++) {
    let [atom, la] = readLeb128(data, pos); pos += la;
    let [varIdx, lv] = readLeb128(data, pos); pos += lv;
    pos += 1;
  }
  
  // 字节码开始
  const bcStart = pos;
  pos += byteCodeLen;
  
  // 检查 hasDebug
  const hasDebug = (flags >> 10) & 1;
  if (hasDebug) {
    // filename atom (leb128)
    let [filenameAtom, lf] = readLeb128(data, pos); pos += lf;
    
    // pc2line 长度
    let [pc2lineLen, lp] = readLeb128(data, pos); pos += lp;
    console.log(`\n[pc2line] len=${pc2lineLen}`);
    
    // pc2line 数据
    const pc2lineData = data.slice(pos, pos + pc2lineLen);
    decodePc2line(pc2lineData);
    pos += pc2lineLen;
    
    // source 长度
    let [sourceLen, ls] = readLeb128(data, pos); pos += ls;
  }
  
  console.log(`\n[分析结束] 总大小=${data.length}`);
}

analyzeBytecode(tsData, 'TS');
analyzeBytecode(wasmData, 'WASM');
