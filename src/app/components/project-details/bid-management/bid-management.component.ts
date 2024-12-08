import { Component, inject, OnInit } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { MasterService } from "../../../../services/master.service";
import { AuthService } from "../../../../services/auth.service";
import { APIResponse } from "../../../../models/interfaces/AuthResponse";

@Component({
  selector: "app-bid-management",
  imports: [],
  templateUrl: "./bid-management.component.html",
  styleUrl: "./bid-management.component.css"
})
export class BidManagementComponent implements OnInit {
  bids: any;
  userId: number = 0;

  masterService = inject(MasterService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.masterService.getVendorId().subscribe(
      (data: any) => {
        console.log("i got here");
        this.userId = data.vendorId;
        console.log(this.userId);

        this.masterService.getBids(this.userId).subscribe(
          (response: APIResponse) => {
            this.bids = response.data;
          },
          error => {
            console.log("Error fetching bids", error);
          }
        );
      },
      error => {
        console.error("Error occurred:", error);
      }
    );
  }
}
