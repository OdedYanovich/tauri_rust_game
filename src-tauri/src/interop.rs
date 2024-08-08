use std::any::type_name;
#[tauri::command]
pub fn fight_step_string<'a>() -> &'a str {
    stringify!(fight_step)
}
#[tauri::command]
pub fn get_buttons_string<'a>() -> &'a str {
    stringify!(get_buttons)
}
#[tauri::command]
pub fn new_command_string<'a>() -> &'a str {
    stringify!(new_command)
}
#[tauri::command]
pub fn selected_correct_actions_string<'a>() -> &'a str {
    stringify!(selected_correct_actions)
}
#[tauri::command]
pub fn get_level_string<'a>() -> &'a str {
    stringify!(get_level)
}
// use create:: levels;
// use levels::{
//         get_buttons, get_buttons_string, get_level, get_level_string, new_command,
//         new_command_string, selected_correct_actions, selected_correct_actions_string,
//         PROGRESS_LOST_MAX,
//     };
