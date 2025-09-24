import ts from 'typescript';

export function getTypeScriptCompilerOptions(tsconfigPath: string = 'tsconfig.json'): ts.CompilerOptions {
  const configFile = ts.findConfigFile(process.cwd(), ts.sys.fileExists, tsconfigPath);
  if (!configFile) {
    throw new Error(`tsconfig.json not found in ${process.cwd()}`);
  }
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd());
  return options;
}
