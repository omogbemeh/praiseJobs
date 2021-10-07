import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  displayMoreFiltersModal = false;
  constructor(private jobService: JobService) {}

  ngOnInit(): void {}
  jobSearchForm = new FormGroup({
    what: new FormControl(''),
    country: new FormControl('ca'),
    where: new FormControl(''),
    // employmentType: new FormControl(''),
    salaryMin: new FormControl(''),
    salaryMax: new FormControl(''),
    // postedIn: new FormControl(),
  });

  onSubmit() {
    this.jobService.filterResults(this.jobSearchForm.value).subscribe(
      (res) => this.jobService.jobs.next(res.results),
      (error) => console.log(error)
    );
    // this.jobService.filterResults(this.jobSearchForm.value).subscribe(
    //   (res) => console.log(res),
    //   (error) => console.log(error)
    // );
  }
  showMoreFilters() {
    this.displayMoreFiltersModal = !this.displayMoreFiltersModal;
  }
}
