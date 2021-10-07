import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../dto/job.dto';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})
export class JobListingComponent implements OnInit {
  jobCount!: number;
  jobs!: Job[];
  job!: Job;
  displayJobDetailBox = false;
  currentIndex = -1;
  displayLoader = false;
  fetching = false;
  constructor(private jobService: JobService) {}
  sortForm = new FormGroup({
    value: new FormControl('default'),
  });

  showJobDetail() {
    this.displayJobDetailBox = !this.displayJobDetailBox;
  }
  ngOnInit(): void {
    this.getAllJobs();
    // this.setFirstJob();
  }

  getAllJobs() {
    this.jobService.jobs.subscribe((res) => {
      this.jobs = res;
      this.job = this.jobs[0];
    });
    this.jobService
      .getCompanyImage(this.job?.company.display_name)
      .subscribe((res) => (this.job.imageUrl = res.logo));
    this.jobService.jobCount.subscribe((res) => (this.jobCount = res));
  }

  // setFirstJob() {
  //   this.job = this.jobs[0];
  //   this.jobService
  //     .getCompanyImage(this.job.company.display_name)
  //     .subscribe((res) => (this.job.imageUrl = res.logo));
  //   // this.getImages();
  //   // console.log('Happened');
  // }

  setCurrentJob(index: number) {
    this.job = this.jobs[index];
    this.displayJobDetailBox = true;
    this.getImages();
  }

  sortResults(e: any) {
    const sortRes = e.target.value;
    this.jobService.sortResults(sortRes).subscribe();
  }

  onScroll(e: any) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (this.displayLoader) return;
      this.displayLoader = true;
      this.jobService.loadMoreJobs().subscribe(
        (res) => {
          this.jobs.push(...res);
          this.displayLoader = false;
        },
        (error) => {
          this.displayLoader = false;
        }
      );
    }
  }

  getImages() {
    this.jobService
      .getCompanyImage(this.job.company.display_name)
      .subscribe((res) => (this.job.imageUrl = res.logo));
  }
}
