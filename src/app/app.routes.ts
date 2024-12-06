import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BidManagementComponent } from './components/bid-management/bid-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginFormComponent },
    { path: "dashboard/projects/:id", component: ProjectDetailsComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "dashboard/projects/:id/bids", component: BidManagementComponent }
];
