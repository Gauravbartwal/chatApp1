import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUser() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null ;
  }
  getFirst() {
    return localStorage.getItem('first');
  }

  getLast() {
    return localStorage.getItem('last');
  }

  getUrl() {
    return localStorage.getItem('url');
  }

  setDataInLocalStorage(variableName, data) {
      localStorage.setItem(variableName, data);
  }

  getToken() {
      return localStorage.getItem('token');
  }

  clearStorage() {
      localStorage.clear();
  }

}
