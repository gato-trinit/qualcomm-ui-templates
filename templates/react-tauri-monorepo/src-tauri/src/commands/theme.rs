use serde::{Deserialize, Serialize};
use tauri_plugin_store::StoreExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct ThemeResponse {
    pub theme: String,
}

#[tauri::command]
pub fn get_theme(app: tauri::AppHandle) -> ThemeResponse {
    let store = app.store("settings.json").expect("failed to access store");

    let theme = store
        .get("theme")
        .and_then(|v| v.as_str().map(String::from))
        .unwrap_or_else(|| "dark".to_string());

    ThemeResponse { theme }
}

#[tauri::command]
pub fn set_theme(app: tauri::AppHandle, theme: String) -> ThemeResponse {
    let validated = match theme.as_str() {
        "light" => "light",
        _ => "dark",
    };

    let store = app.store("settings.json").expect("failed to access store");

    store.set("theme", serde_json::json!(validated));

    ThemeResponse {
        theme: validated.to_string(),
    }
}
