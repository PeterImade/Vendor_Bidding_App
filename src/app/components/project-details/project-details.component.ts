import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MasterService } from "../../../services/master.service";
import { IProject } from "../../../models/interfaces/IProject";
import { IBid } from "../../../models/interfaces/IBid";
import { APIResponse } from "../../../models/interfaces/AuthResponse";
import { BidManagementComponent } from "./bid-management/bid-management.component";

@Component({
  selector: "app-project-details",
  imports: [FormsModule, RouterModule],
  templateUrl: "./project-details.component.html",
  styleUrl: "./project-details.component.css"
})
export class ProjectDetailsComponent implements OnInit {
  userId: number= 0;
  project: IProject | null = null;
  successMessage: string | null = "";
  errorMessage: string | null = "";

  isSubmitted: boolean = false;

  route = inject(ActivatedRoute);
  masterService = inject(MasterService);

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get("id");

    this.masterService.getOneProject(Number(projectId)).subscribe(
      (response: APIResponse) => {
        this.project = response.data;
      },
      error => {
        console.error("Error fetching project details:", error);
      }
    );
  }

  bidAmount: number = 0;

  onSubmitBid() {
    if (this.project && this.bidAmount != 0) {
      
      this.masterService.getVendorId().subscribe((data: any) => { 
        console.log("i got here");
        this.userId = data.vendorId;
        console.log(this.userId);
        
      
      
      console.log(`vendor id: ${this.userId}`);
      const bid: IBid = {
        vendorId: this.userId,
        projectId: this.project?.id,
        amount: this.bidAmount
      };
      this.masterService.submitBid(bid).subscribe(
        (response: APIResponse) => {
          this.successMessage = "Your bid has been submitted successfully!";
          this.bidAmount = 0;
          this.isSubmitted = true;
          this.errorMessage = null;
        },
        error => {
          console.error("Error submitting bid:", error);
          this.errorMessage =
            "There was an error submitting your bid. Please try again later.";
          this.successMessage = null;
        }
      );},  error => {
        console.error("Error occurred:", error); 
      });
    }
  }
}
