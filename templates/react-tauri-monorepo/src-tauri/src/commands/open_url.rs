use serde::{Deserialize, Serialize};
use tauri_plugin_opener::OpenerExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct SimpleApiResponse {
    pub message: String,
}

#[tauri::command]
pub fn open_external_url(app: tauri::AppHandle, url: String) -> SimpleApiResponse {
    match app.opener().open_url(&url, None::<&str>) {
        Ok(()) => SimpleApiResponse {
            message: format!("Opened: {}", url),
        },
        Err(e) => SimpleApiResponse {
            message: format!("Failed to open URL: {}", e),
        },
    }
}
