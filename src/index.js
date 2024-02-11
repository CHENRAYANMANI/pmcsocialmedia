// import "bootstrap/dist/css/bootstrap.css";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
// <BrowserRouter>
//   <App />
// </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import "./index1.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import store from "./redux/store";
let persistor = persistStore(store);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="1045148982383-87u6hh6sn8fqish7dgr0ob8gvi7059kn.apps.googleusercontent.com">
          <App />
          {/* <Google /> */}
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
