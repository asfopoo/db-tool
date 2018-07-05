import config from 'config';

import jwtDecode from 'jwt-decode';

const AuthService = {
  decodeToken(){
    const token = AuthService.getToken();
    return AuthService.decodeJwt(token);
  },
  decodeJwt(jwt){
    return jwtDecode(jwt);
  },
  getToken(){
    return localStorage.getItem(config.get('tokenName'));
  },
  isAuthenticated(){
    return !!AuthService.getToken();
  },
  removeToken(){
    localStorage.removeItem(config.get('tokenName'));
  },
  setToken(value){
    localStorage.setItem(config.get('tokenName'), value);
  },
};

export default AuthService;
