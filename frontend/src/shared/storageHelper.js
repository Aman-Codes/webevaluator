import cookie from "js-cookie";

// Set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
      sameSite: "strict",
      secure: true,
    });
  }
};

// Remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
  return null;
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get from localstorage
export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Get from session storage
export const getSessionStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem(key));
  }
  return null;
};

// Set in session storage
export const setSessionStorage = (key, value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
