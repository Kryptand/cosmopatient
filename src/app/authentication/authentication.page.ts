import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "./authentication.service";

@Component({
  selector: "kryptand-authentication",
  templateUrl: "./authentication.page.html",
  styleUrls: ["./authentication.page.scss"]
})
export class AuthenticationPage implements OnInit {
  passwordCtrl: FormControl = new FormControl();
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}
  loginButtonTriggered() {
    const validPassword = this.authService.checkForValidPassword(
      this.passwordCtrl.value
    );
    if (!validPassword) {
      this.passwordCtrl.setErrors({ wrongPassword: true });
      return;
    }
    this.authService.login();
  }
}
