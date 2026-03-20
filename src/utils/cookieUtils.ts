/**
 * Cookie Utilities
 * Functions to read and parse cookies from the browser
 */

/**
 * Get cookie value by name
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
};

/**
 * Parse CCLVL roles string
 * Slices string every 4 characters
 * Example: "DDLMADMINAPPRSU" → ["DDLM", "ADMI", "NAPP", "RSU"]
 */
export const parseCCLVLRoles = (cclvl: string): string[] => {
  if (!cclvl) return [];
  
  const roles: string[] = [];
  for (let i = 0; i < cclvl.length; i += 4) {
    roles.push(cclvl.substring(i, i + 4));
  }
  
  return roles;
};

/**
 * Extract auth data from cookies
 * Called on app initialization to read redirect data
 */
export const getAuthDataFromCookies = () => {
  return {
    userKey: getCookie('FRCUSERKEY'),
    cclvl: getCookie('CCLVL'),
    sessionKey: getCookie('MSC_SESSION'),
  };
};

/**
 * Store session key in sessionStorage
 */
export const storeSessionKey = (sessionKey: string): void => {
  if (sessionKey) {
    sessionStorage.setItem('MSC_SESSION', sessionKey);
  }
};

/**
 * Get session key from sessionStorage
 */
export const getSessionKey = (): string | null => {
  return sessionStorage.getItem('MSC_SESSION');
};

/**
 * Clear session storage on logout
 */
export const clearSessionStorage = (): void => {
  sessionStorage.removeItem('MSC_SESSION');
};
