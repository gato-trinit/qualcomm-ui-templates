mod commands;

use commands::open_url::open_external_url;
use commands::theme::{get_theme, set_theme};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            get_theme,
            set_theme,
            open_external_url
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
