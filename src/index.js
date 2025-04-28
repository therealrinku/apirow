import { currentApp } from "./state/app-state.js";
import { homepage } from "./pages/home.js";
import { sqlClientPage } from "./pages/sql-client.js";
import { apiClientPage } from "./pages/api-client.js";

const { element, component } = window.rowanjs;

const root = component(() => {
  const rootElem = element("div");
  rootElem.addClass(
    "h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500",
  );

  // routing , sort of
  if (!currentApp.get()) {
    rootElem.append(homepage.get());
  } else if (currentApp.get() === "sql_client") {
    rootElem.append(sqlClientPage.get());
  } else if (currentApp.get() === "api_client") {
    rootElem.append(apiClientPage.get());
  }

  return rootElem;
});

root.addDep(currentApp);
root.get().createRoot();
