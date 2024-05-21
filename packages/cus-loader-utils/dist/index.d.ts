type TypeBeforeExitHook = (cb: () => void) => void;
declare const beforeExitHook: TypeBeforeExitHook;
export default beforeExitHook;
