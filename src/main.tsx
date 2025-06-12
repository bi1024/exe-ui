import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import { TempoDevtools } from "tempo-devtools";
import { RoomProvider } from "./context/RoomContext.tsx";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <RoomProvider>
          <App />
        </RoomProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
