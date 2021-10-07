import { Component, OnInit, Input } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
  @Input() title = '';
  @Input() company = '';
  @Input() location = '';
  @Input() time!: Date;
  @Input() image!: string;

  imgUrl!: string;
  postedOn!: string;
  diff!: string;
  displayNew = false;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getImages();
    this.getDate();
  }

  getImages() {
    this.jobService
      .getCompanyImage(this.company)
      .subscribe((res) => (this.imgUrl = res.logo));
  }

  getDate() {
    const postedOn = new Date(this.time);
    const date = postedOn.getDate();
    const month = postedOn.getMonth();
    const monthText = postedOn.toLocaleString('default', { month: 'short' });
    const year = postedOn.getFullYear();
    const realDate = `${date} ${monthText} ${year}`;
    this.postedOn = realDate;
    this.getDateDiff(postedOn);
  }

  getDateDiff(postedOn: Date) {
    const milliSecondsToDay = 1000 * 60 * 60 * 24;
    const now = new Date();
    const diff = Math.round(
      (now.valueOf() - postedOn.valueOf()) / milliSecondsToDay
    );
    if (diff < 1) {
      this.displayNew = true;
      this.diff = `Today`;
    } else if (diff <= 1) {
      this.displayNew = true;
      this.diff = `${diff} day ago`;
    } else if (diff > 1 && diff <= 2) {
      this.displayNew = true;
      this.diff = `${diff} days ago`;
    }
  }
}
