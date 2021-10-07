import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Job, JobResponse } from '../dto/job.dto';
import { CompanyLogo } from '../dto/company-logo.dto';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobCount = new BehaviorSubject<number>(0);
  private country = 'ca';
  private company = 'google';
  private pageNumber = 1;
  private resultsPerPage = 10;
  private pageNum = this.pageNumber;
  params: any = {
    results_per_page: this.resultsPerPage,
  };
  jobs = new BehaviorSubject<Job[]>([]);
  job!: Job;
  private rootUrl = `https://api.adzuna.com/v1/api/jobs/${this.country}/search/`;
  private getImageUrl = 'https://company.clearbit.com/v1/domains/find?name=';
  constructor(private http: HttpClient) {}
  // Get all jobs
  getAllJobs() {
    return this.http
      .get<JobResponse>(`${this.rootUrl}${this.pageNumber}`, {
        params: this.params,
      })
      .pipe(
        tap((res) => {
          this.jobs.next(res.results);
          this.jobCount.next(Math.round(res.count));
        })
      );
  }

  // Load More Jobs
  loadMoreJobs() {
    this.pageNum++;
    return this.http
      .get<JobResponse>(`${this.rootUrl}${this.pageNum}`, {
        params: this.params,
      })
      .pipe(map((result) => result.results));
  }

  // Sort Options
  sortResults(sortBy: string) {
    this.jobs.next([]);
    return this.http
      .get<JobResponse>(`${this.rootUrl}`, {
        params: { ...this.params, sort_by: sortBy },
      })
      .pipe(
        tap((res) => {
          this.jobs.next(res.results);
          this.jobCount.next(res.count);
        })
      );
  }

  // Filter Results
  filterResults(queryParams: any) {
    this.jobs.next([]);
    const {
      what,
      where,
      country,
      salary_min,
      // salary_max,
      // employmentType,
      max_days_old,
    } = queryParams;
    const params = {
      what,
      where,
      salary_min,
      // salary_max,
      // employmentType,
      max_days_old,
    };
    this.params = { ...this.params, ...params };
    console.log(this.params);
    this.country =
      queryParams.country !== '' ? queryParams.country : this.country;
    this.rootUrl = `https://api.adzuna.com/v1/api/jobs/${this.country}/search/`;
    return this.http
      .get<JobResponse>(`${this.rootUrl}`, {
        params: this.params,
      })
      .pipe(tap((res) => this.jobCount.next(res.count)));
  }

  // Get images
  getCompanyImage(name: string) {
    return this.http.get<CompanyLogo>(`${this.getImageUrl}${name}`);
  }
}
