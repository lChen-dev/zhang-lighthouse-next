export type DispatchedAction<ActionCreator extends (...args: any[]) => any> = (...args: Parameters<ActionCreator>) => ReturnType<ReturnType<ActionCreator>>;
