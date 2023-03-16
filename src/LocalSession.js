
export const startSession = (theEmail, thetoken, theUsername) => {
    sessionStorage.setItem("email", theEmail);
    sessionStorage.setItem("accessToken", thetoken);
    sessionStorage.setItem("username", theUsername)
  }
  
  export const getSession = () => {
    return {
      email: sessionStorage.getItem("email"),
      accessToken: sessionStorage.getItem("accessToken"),
      username: sessionStorage.getItem("username"),
    }
  }
  
  export const endSession = () => {
    sessionStorage.clear();
  }
  
  export const isLoggedIn = () => {
    return getSession().accessToken;
  }