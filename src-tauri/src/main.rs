// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// enum Mod {
//     Levels = 1,
//     Sound = 2,
//     Exit = 3,
//     Credit = 4,
//     Game = 5,
// }

// enum Command {
//     Bi,
//     Nbi,
//     B0b,
//     Nb0b,
// }

// enum LevelStage {
//     FullTable,
//     ChosenColumn,
// }

// enum GameStage {
//     Prepare,
//     Action,
// }