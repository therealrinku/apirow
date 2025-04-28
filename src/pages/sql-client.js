const { component, element } = window.rowanjs;
import { currentApp } from "../state/app-state.js";

export const sqlClientPage = component(() => {
  const wrapper = element("div");

  const text = element("p");
  text.setText("this is sql client");
  wrapper.append(text);

  const backBtn = element("button");
  backBtn.setText("Go Back");
  backBtn.onClick(() => currentApp.set(null));
  wrapper.append(backBtn);

  return wrapper;
});
