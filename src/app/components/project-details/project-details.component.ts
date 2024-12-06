import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MasterService } from "../../../services/master.service"; 
import { IProject } from "../../../models/interfaces/IProject";
import { IBid } from "../../../models/interfaces/IBid";
import { APIResponse } from "../../../models/interfaces/AuthResponse";

@Component({
  selector: "app-project-details",
  imports: [FormsModule, RouterModule],
  templateUrl: "./project-details.component.html",
  styleUrl: "./project-details.component.css"
})
export class ProjectDetailsComponent implements OnInit {
  project: IProject | null = null;
  successMessage: string | null = "";
  errorMessage: string | null = "";

  isSubmitted: boolean = false

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
      const bid: IBid = {
        vendorId: 1, // This should be the authenticated vendor's ID
        projectId: this.project.id,
        amount: this.bidAmount
      };
      this.masterService.submitBid(bid).subscribe(
        (response: APIResponse) => {
          this.successMessage = "Your bid has been submitted successfully!";
          this.bidAmount = 0
          this.isSubmitted = true
          this.errorMessage = null;
          console.log(response);
          
        },
        error => {
          console.error("Error submitting bid:", error);
          this.errorMessage =
            "There was an error submitting your bid. Please try again later.";
          this.successMessage = null;
        }
      );
    }
  }
}
