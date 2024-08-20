// https://serde.rs/enum-number.html
// #[derive(serde::Serialize, Clone, Copy)]
pub enum CommandType {
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
}
pub struct Command {
    command_type: CommandType,
    button: char,
    index: u8,
}
#[tauri::command]
pub fn create_commands() {}

#[tauri::command]
pub fn check_player_input() {}
