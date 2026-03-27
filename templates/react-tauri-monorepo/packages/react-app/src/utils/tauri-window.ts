export let tauriWindow: {
  close: () => Promise<void>
  minimize: () => Promise<void>
  toggleMaximize: () => Promise<void>
}

try {
  const mod = await import("@tauri-apps/api/window")
  tauriWindow = mod.getCurrentWindow()
} catch {
  // Running outside of Tauri (browser dev mode)
}
