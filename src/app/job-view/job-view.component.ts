import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../dto/job.dto';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  @Input() job!: Job;
  imageUrl!: string;

  postedDate!: string;
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getDate();
    this.getCompanyLogo(this.job);
    // this.imageUrl = this.job.imageUrl as string
  }

  ngOnChange() {
    this.jobService
      .getCompanyImage(this.job?.company.display_name)
      .subscribe((res) => (this.job.imageUrl = res.logo));
  }

  ngOnChanges() {
    this.getDate();
    this.getCompanyLogo(this.job);
  }

  getCompanyLogo(job: Job) {
    this.jobService
      .getCompanyImage(this.job?.company.display_name)
      .subscribe((res) => (this.job.imageUrl = res?.logo));
  }

  getDate() {
    const postedOn = new Date(this.job?.created);
    const date = postedOn.getDate();
    const month = postedOn.getMonth();
    const monthText = postedOn.toLocaleString('default', { month: 'short' });
    const year = postedOn.getFullYear();
    const realDate = `${date} ${monthText} ${year}`;
    this.postedDate = realDate;
  }
}
