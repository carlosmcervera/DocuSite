// Unconfigured destinations are never rendered as actions.
export const appLinks = {
 register: process.env.REACT_APP_REGISTRATION_URL || '',
 appStore: process.env.REACT_APP_APP_STORE_URL || '',
 googlePlay: process.env.REACT_APP_GOOGLE_PLAY_URL || '',
 pack10: process.env.REACT_APP_CHECKOUT_PACK10_URL || '',
 pack50: process.env.REACT_APP_CHECKOUT_PACK50_URL || '',
 pack200: process.env.REACT_APP_CHECKOUT_PACK200_URL || '',
};
export const validLink = target => { try { const u = new URL(appLinks[target]); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };
