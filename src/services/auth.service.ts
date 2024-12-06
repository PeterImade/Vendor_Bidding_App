import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  extractPayloadFromToken() {
    const token = this.getToken();
    console.log(`token:${token}`);
    
    if (token) {
      try {
        const payload = jwtDecode(token);
        console.log(`payload: ${payload.aud}`);
        console.log(`payload: ${payload.w}`);
        
        // return payload.id || null;
      } catch (error) {
        console.error("Failed to decode token", error);
        return null;
      }
    }
    return null;
  }
}
