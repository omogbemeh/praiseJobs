import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobViewComponent } from './job-view/job-view.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: JobListingComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
