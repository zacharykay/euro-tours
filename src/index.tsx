import ReactDOM from "react-dom";

import "./index.scss";
import App from "./App";

import { FilterProvider } from "./context/filter_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/user_context";

// let Auth0Domain: string | undefined;
// let Auth0ClientId: string | undefined;
// const Auth0VariableErrorMsg = (envVariable: string): string =>
//   `process.env variable for Auth0 ${envVariable} was not supplied to Auth0 Provider`;

// if (process.env.REACT_APP_AUTH_DOMAIN) {
//   Auth0Domain = process.env.REACT_APP_AUTH_DOMAIN;
// }
// if (process.env.REACT_APP_AUTH_CLIENT_ID) {
//   Auth0ClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
// }

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID!}
    redirectUri={window.location.origin}
    callbackUrl={window.location.origin}
    responseType="token id_token"
    cacheLocation="localstorage"
  >
    <UserProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
