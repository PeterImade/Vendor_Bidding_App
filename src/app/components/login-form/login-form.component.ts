import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MasterService } from "../../../services/master.service";
import { Auth } from "../../../models/interfaces/Auth";

@Component({
  selector: "app-login-form",
  imports: [CommonModule, FormsModule],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.css"
})
export class LoginFormComponent {
  email: string = "";
  password: string = "";
  anyError: boolean = false;

  router = inject(Router);
  master = inject(MasterService);

  login() {
    if (this.email && this.password) {
      const data: Auth = {
        email: this.email,
        password: this.password
      };

      this.master.loginVendor(data).subscribe((token: string)=>{
        console.log(token.toString());
        localStorage.setItem("jwtToken", token.toString());
      });
      
      this.router.navigate(["dashboard"]);
    } else {
      this.anyError = true;
    }
  }
}
