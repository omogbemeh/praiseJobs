import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(private jobService: JobService) {}
  jobSearchForm = new FormGroup({
    employmentType: new FormControl(''),
    salaryMin: new FormControl(''),
    salaryMax: new FormControl(''),
    postedIn: new FormControl(''),
  });
  ngOnInit(): void {}
  onChange(e: any) {
    const { value } = e;
    this.jobSearchForm.patchValue({
      employmentType: value,
    });
  }

  submitFilterResults() {
    console.log(this.jobSearchForm.value);

    const { salaryMin, salaryMax, employmentType, postedIn } =
      this.jobSearchForm.value;
    const filters = {
      salary_min: parseFloat(salaryMin),
      salary_max: parseFloat(salaryMax),
      max_days_old: parseFloat(postedIn),
      // employmentType,
    };
    this.jobService.filterResults(filters).subscribe();
  }
}
