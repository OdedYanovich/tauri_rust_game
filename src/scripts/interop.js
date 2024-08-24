const invoke = window.__TAURI__.core.invoke; //window.__TAURI__.tauri;
export const getButtons = async (buttons) => {
  return await invoke("get_buttons");
};

export const setLevel = async (level) => {
  return await invoke("set_level", { id: level });
};
export const initFight = async () => {
  return await invoke("init_fight");
};
export const create_commands = async () => {
  return await invoke("create_commands");
};
export const check_player_action = async (action) => {
  return await invoke("check_player_action", { action: action });
};
