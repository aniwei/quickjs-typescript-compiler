"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_path_1 = require("node:path");
const cli = (0, node_path_1.resolve)(process.cwd(), 'dist/cli.js');
const r = (0, node_child_process_1.spawnSync)('node', [cli, '__tests__/compute.ts'], { env: { ...process.env, DUMP_ASM: '1' }, stdio: 'inherit' });
process.exit(r.status ?? 1);
