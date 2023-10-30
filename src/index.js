import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./Context/productcontext";
import { FilterContextProvider } from "./Context/filter_context";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain="dev-7s586vlsd3rc3cwr.us.auth0.com"
        clientId="g0pMjHCFdj2SV4REet4UtTHFEdrCM6jU"
        redirectUri={window.location.origin}
    >
        <AppProvider>
            <FilterContextProvider>
                <App />
            </FilterContextProvider>
        </AppProvider>
    </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
