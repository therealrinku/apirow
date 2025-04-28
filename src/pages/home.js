const { component, element } = window.rowanjs;
import { currentApp } from "../state/app-state.js";

export const homepage = component(() => {
  const wrapper = element("div");
  wrapper.addClass(
    "h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500",
  );

  const buttons = [
    { label: "Api Client", key: "api_client" },
    { label: "Sql Client", key: "sql_client" },
  ];

  const buttonsWrapper = element("div");
  buttonsWrapper.addClass("flex items-center gap-2");
  wrapper.append(buttonsWrapper);

  buttons.forEach((button) => {
    const btn = element("button");
    btn.addClass(
      "h-24 px-10 rounded bg-gradient-to-b from-rose-400 to-pink-600 text-white hover:bg-gradient-to-b hover:from-pink-600 hover:to-rose-400 shadow-md",
    );
    btn.onClick(() => currentApp.set(button.key));
    btn.setText(button.label);
    buttonsWrapper.append(btn);
  });

  return wrapper;
});
