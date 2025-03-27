import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ApolloClientProvider from "./ApolloClient.jsx";
import "./i18n"; // Initialize translations

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </React.StrictMode>
);
