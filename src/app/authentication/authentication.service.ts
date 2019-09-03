import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

const TOKEN_KEY = "auth-token";
const SUPER_STRONG_PASSWORD = "passwort";
@Injectable(
)
export class AuthenticationService {
  authenticated = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      const now = new Date();
      if (new Date(res) < now) {
        this.authenticated.next(true);
      }
      this.authenticated.next(false);
    });
  }

  checkForValidPassword(password: string): boolean {
    return password === SUPER_STRONG_PASSWORD;
  }
  async login() {
    const date = new Date(
      new Date().getTime() + 35 * 60000
    ).toLocaleDateString();
    await this.storage.set(TOKEN_KEY, date);
      this.authenticated.next(true);
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
      this.authenticated.next(false);
  }

  isAuthenticated() {
    return this.authenticated.value;
  }
}
