import axios from "axios";

const Authentication = {
    isLoggedIn: window.localStorage.getItem('loginToken') != null,

    onAuthentication(token) {
        this.isLoggedIn = true;
        window.localStorage.setItem('loginToken', token);
    },

    onLogout() {
        this.isLoggedIn = false;
        window.localStorage.removeItem('loginToken');
    },

    isAuthenticated(){
      return this.isLoggedIn;
    }
};

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('loginToken');
    if (token == null) return config;

    if (!config.headers) {
       config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default Authentication;