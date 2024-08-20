const invoke = window.__TAURI__.core.invoke; //window.__TAURI__.tauri;
export const getButtons = async (buttons) => {
  return await invoke("get_buttons", {
    length: buttons,
  });
};

export const new_command = async (levelIndex) => {
  return await invoke("new_command", {
    levelIndex: levelIndex,
  });
};
export const getShuffledIndices = async (length) => {
  return await invoke("get_shuffled_indices", {
    length: length,
  });
};

