import fs from 'fs/promises';

export type TraceSource = 'ts' | 'wasm';

export type ModuleTraceEventName =
	| 'resolve-start'
	| 'resolve-done'
	| 'link-start'
	| 'link-done'
	| 'eval-start'
	| 'eval-done';

export interface ModuleTraceEvent {
	cat: 'module';
	source: TraceSource;
	module: number;
	moduleName: string;
	event: ModuleTraceEventName;
	timestamp: string;
	[key: string]: unknown;
}

export interface TraceRecorderOptions {
	moduleName: string;
	source: TraceSource;
	moduleId?: number;
	sink?: (event: ModuleTraceEvent) => void;
}

export class TraceRecorder {
	private events: ModuleTraceEvent[] = [];
	private readonly moduleName: string;
	private readonly source: TraceSource;
	private readonly moduleId: number;
	private readonly sink?: (event: ModuleTraceEvent) => void;

	constructor(options: TraceRecorderOptions) {
		this.moduleName = options.moduleName;
		this.source = options.source;
		this.moduleId = options.moduleId ?? 1;
		this.sink = options.sink;
	}

	record(event: ModuleTraceEventName, payload: Record<string, unknown> = {}): void {
		const traceEvent: ModuleTraceEvent = {
			cat: 'module',
			source: this.source,
			module: this.moduleId,
			moduleName: this.moduleName,
			event,
			timestamp: new Date().toISOString(),
			...payload,
		};

		this.events.push(traceEvent);
		if (this.sink) {
			this.sink(traceEvent);
		}
	}

	getEvents(): ModuleTraceEvent[] {
		return [...this.events];
	}

	async writeToFile(filePath: string): Promise<void> {
		const lines = this.events.map((event) => JSON.stringify(event));
		await fs.writeFile(filePath, lines.join('\n'), 'utf8');
	}
}
