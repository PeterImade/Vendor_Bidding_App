import { Component, inject, OnInit } from "@angular/core";
import { MasterService } from "../../../services/master.service"; 
import { jwtDecode } from "jwt-decode";  
import { APIResponse } from "../../../models/interfaces/AuthResponse";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-bid-management",
  imports: [],
  templateUrl: "./bid-management.component.html",
  styleUrl: "./bid-management.component.css"
})
export class BidManagementComponent implements OnInit {
  bids: any; 

  master = inject(MasterService);
  authService = inject(AuthService)
  
  ngOnInit(): void {
    const vendorId: any = this.authService.extractPayloadFromToken()
    console.log(vendorId);
    
    this.master.getBids(vendorId).subscribe(
      (response: APIResponse) => {
        this.bids = response.data;
      },
      error => {
        console.log("Error fetching bids", error);
      }
    );
  }
 
}
