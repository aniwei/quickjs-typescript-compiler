export interface DebugRecordingController {
  withoutDebugRecording<T>(fn: () => T): T
}

export function runWithoutDebug<T>(controller: DebugRecordingController, fn: () => T): T {
  return controller.withoutDebugRecording(fn)
}
