import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }
}
