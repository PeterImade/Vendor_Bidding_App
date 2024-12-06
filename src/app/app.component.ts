import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "bidding-app";
}
