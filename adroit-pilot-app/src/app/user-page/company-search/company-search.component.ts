import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';
import { Company } from 'src/app/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  companies: Company[] = [];
  origin_companies: Company[] = null;
  searchCompany = '';
  searchLocation = '';
  searchKeyword = '';

  showFilter = false;

  start_index = 0;
  end_index = 0;
  cur_count = 5;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private loaderService: LoaderService) {
    this.loaderService.startLoader();
    this.userService.getCompanies()
      .subscribe(res => {
        this.loaderService.stopLoader();
        this.origin_companies = res;
        this.showCompaniesPredicted();
        console.log(res);
      });
  }

  ngOnInit() {
  }

  filter_companies() {
    this.companies = this.origin_companies.filter(val => {
      if ((val.company_name.toLowerCase().includes(this.searchCompany.toLowerCase()) || this.searchCompany.length === 0) &&
        (val.company_location.toLowerCase().includes(this.searchLocation.toLowerCase()) || this.searchLocation.length === 0) &&
        (this.filterKeywords(val.keywords) || this.searchKeyword.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  filterKeywords(keywords: Array<string>) {
    return keywords.some(keyword => {
      return keyword.toLowerCase().includes(this.searchKeyword.toLowerCase());
    });
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

  clearFilters() {
    this.searchCompany = '';
    this.searchLocation = '';
    this.searchKeyword = '';

    this.start_index = this.end_index = 0;
    this.cur_count = 5;
    this.companies = [];
    this.showCompaniesPredicted();
  }

  showCompany(company: Company) {
    const companyId = company ? company['_id'].$oid : null;

    this.router.navigate(['company', companyId]);
  }

}
