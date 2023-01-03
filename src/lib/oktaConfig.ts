export const oktaConfig = {
  clientId: "0oa7s6t0hvlZPSvld5d7",
  issuer: "https://dev-20550336.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
