import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { APIResponse } from "../models/interfaces/AuthResponse";
import { IBid } from "../models/interfaces/IBid";
import { Auth } from "../models/interfaces/Auth";

@Injectable({
  providedIn: "root"
})
export class MasterService {
  http = inject(HttpClient)

  getProjects(): Observable<APIResponse> {
    return this.http.get<APIResponse>("https://localhost:7152/api/projects");
  }
  getOneProject(projectId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://localhost:7152/api/projects/${projectId}`
    );
  }
  submitBid(bid: IBid): Observable<APIResponse> {
    return this.http.post<APIResponse>("https://localhost:7152/api/bids", bid);
  }
  getBids(vendorId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://localhost:7152/api/bids/${vendorId}`
    );
  }
  loginVendor(auth: Auth): Observable<string> {
    return this.http.post<string>(
      "https://localhost:7152/api/auth/login",
      auth,
      { responseType: 'text' as 'json' }
    );
  }
}
