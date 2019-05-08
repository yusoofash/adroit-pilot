import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';
import { Company } from '../../models';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-predict',
  templateUrl: './company-predict.component.html',
  styleUrls: ['./company-predict.component.css']
})
export class CompanyPredictComponent implements OnInit {

  user_details = null;
  selected_resume = null;
  new_resume = null;
  load_start = false;
  origin_companies: Company[] = null;
  companies: Company[];
  resume_index = null;
  upload_new = false;
  salary = 0;
  high_salary = 40;
  experience = 0;
  options: Options = {
    floor: 1,
    ceil: 40
  };

  start_index = 0;
  end_index = 0;
  cur_count = 5;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private loaderService: LoaderService) {
    this.getUserDetails();
  }

  ngOnInit() {
  }

  getUserDetails() {
    this.loaderService.startLoader();
    this.userService.getDetails().subscribe(res => {
      this.loaderService.stopLoader();
      this.user_details = res;
    });
  }

  onChange(e) {
    this.selected_resume = null;
    this.new_resume = e.target.files[0];
  }

  predict() {
    this.end_index = this.start_index = 0;
    this.companies = [];
    if (this.new_resume || this.selected_resume) {
      // this.loaderService.startLoader();
      this.load_start = true;
      if (this.new_resume) {
        this.userService.uploadResume(this.new_resume).subscribe(res => {
          // this.loaderService.stopLoader();
          this.origin_companies = res;
          this.load_start = false;
          this.showCompaniesPredicted();
          this.getUserDetails();
        });
      } else if (this.selected_resume) {
        this.userService.getPredictions(this.selected_resume).subscribe(res => {
          // this.loaderService.stopLoader();
          this.origin_companies = res;
          this.load_start = false;
          this.showCompaniesPredicted();
          console.log('predicted companies', res);
        });
      }
    }
  }

  delete_resume(resume) {
    if (confirm('Are u sure to delete')) {
      this.loaderService.startLoader();
      this.userService.deleteResume(resume).subscribe(res => {
        console.log(res);
        this.loaderService.stopLoader();
        this.getUserDetails();
        this.selected_resume = null;
      });
    }
  }

  showCompaniesPredicted() {
    this.loaderService.startLoader();
    setTimeout(() => {
      this.loaderService.stopLoader();
      if (this.end_index === this.origin_companies.length && this.start_index === this.end_index) {
        this.toastr.info('No More Results', 'Info');
      } else if (this.end_index >= this.origin_companies.length || (this.end_index + this.cur_count >= this.origin_companies.length)) {
        this.end_index = this.origin_companies.length;
      } else {
        this.end_index += this.cur_count;
      }

      while (this.start_index < this.end_index) {
        this.companies.push(this.origin_companies[this.start_index]);
        this.start_index++;
      }
    }, 1000);
  }

  filter_companies(e) {
    this.companies = this.origin_companies.filter(company => {
      const companyExperience = company.company_experience ? company.company_experience : 0;
      const companySalary = company.company_salary ? company.company_salary : 0;

      return (companySalary <= this.salary * 100000) && (companyExperience <= this.experience);
    });
  }

  // sortFunc(a: Company, b: Company) {
  //   if (a.salary > )
  // }

  showCompany(company: Company) {
    const companyId = company ? company['_id'].$oid : null;

    this.router.navigate(['company', companyId]);
  }

  clear_filter() {
    console.log('clikeds', this.origin_companies);
    setTimeout(() => {
      this.companies = this.origin_companies.map(val => val);
    }, 500);
    this.salary = 0;
    this.experience = 0;
  }

}
