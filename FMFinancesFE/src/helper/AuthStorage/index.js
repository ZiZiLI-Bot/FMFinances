const AuthStorage = {
  setKey: (key, value) => {
    localStorage.setItem(`${key}`, value);
  },
  getKey: (key) => {
    if (!!localStorage.getItem(key) || !!sessionStorage.getItem(key)) {
      return localStorage.getItem(key) || sessionStorage.getItem(key);
    } else {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
};

export default AuthStorage;
