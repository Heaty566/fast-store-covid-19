import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import AutoLoginWrapper from "./common/HOC/autoLoginWrapper";

ReactDOM.render(
        <React.StrictMode>
                <BrowserRouter>
                        <Provider store={store}>
                                <AutoLoginWrapper>
                                        <App />
                                </AutoLoginWrapper>
                        </Provider>
                </BrowserRouter>
        </React.StrictMode>,
        document.getElementById("root")
);
