// Fill these public destination URLs when the owner supplies the real links.
// Empty values deliberately open an honest placeholder, never a fake registration.
export const appLinks = {
  register: process.env.REACT_APP_REGISTRATION_URL || "",
  appStore: process.env.REACT_APP_APP_STORE_URL || "",
  googlePlay: process.env.REACT_APP_GOOGLE_PLAY_URL || "",
};
