// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod levels;
// #[tauri::command]
// fn execute_instruction(instruction: PlayerInstruction) {}
fn main() {
    use levels::{
        get_buttons, get_level, get_shuffled_indices, new_command, selected_correct_actions,
        set_buttons, set_level, PROGRESS_LOST_MAX,
    };
    use std::sync::Mutex;
    tauri::Builder::default()
        .manage(Mutex::new(1u8))
        .manage(Mutex::new(&(['a'][..])))
        .manage(Mutex::new(PROGRESS_LOST_MAX))
        .manage(Mutex::new(vec![vec!['a']]))
        .invoke_handler(tauri::generate_handler![
            get_shuffled_indices,
            get_level,
            set_level,
            selected_correct_actions,
            get_buttons,
            set_buttons,
            new_command,
        ])
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

// enum LevelStage {
//     FullTable,
//     ChosenColumn,
// }
// enum GameStage {
//     Prepare,
//     Action,
// }
