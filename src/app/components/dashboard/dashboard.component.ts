import { Component, inject, OnInit } from "@angular/core";
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { MasterService } from "../../../services/master.service";
import { RouterModule } from "@angular/router";
import { IProject } from "../../../models/interfaces/IProject"; 
import { APIResponse } from "../../../models/interfaces/AuthResponse";

@Component({
  selector: "app-dashboard",
  imports: [RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
  projects: IProject[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.masterService.getProjects().subscribe(
      (result: APIResponse) => {
        this.projects = result.data;
      },
      error => {
        console.log("Error fetching designations", error);
      }
    );
  }
}
