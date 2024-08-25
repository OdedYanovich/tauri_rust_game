// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod mods;

pub type TauriStateWrapper<'a, T> = tauri::State<'a, std::sync::Mutex<T>>;
const PROGRESS_LOST_MAX: u8 = 50;

use mods::fight::{check_player_action, create_commands, init_fight, Command};
use mods::level_selector::{get_buttons, set_level};
use std::sync::Mutex;
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(PROGRESS_LOST_MAX))
        .manage(Mutex::new(vec![Command::default()]))
        .invoke_handler(tauri::generate_handler![
            get_buttons,
            set_level,
            check_player_action,
            init_fight,
            create_commands,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

