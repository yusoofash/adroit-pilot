import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';
import { Company } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  companies: Company[];
  searchCompany = '';
  searchLocation = '';
  searchKeyword = '';

  showFilter = false;

  constructor(private userService: UserService,
    private router: Router,
    private loaderService: LoaderService) {
    this.loaderService.startLoader();
    this.userService.getCompanies()
      .subscribe(res => {
        this.loaderService.stopLoader();
        this.companies = res;
        console.log(res);
      });
  }

  ngOnInit() {
  }

  filter(company: Company) {
    if (this.searchCompany.length === 0 && this.searchLocation.length === 0 && this.searchKeyword.length === 0) {
      return true;
    } else if ((company.company_name.includes(this.searchCompany) || this.searchCompany.length === 0) &&
      (company.company_location.includes(this.searchLocation) || this.searchLocation.length === 0) &&
      (this.filterKeywords(company.keywords) || this.searchKeyword.length === 0)) {
      return true;
    } else {
      return false;
    }
  }

  filterKeywords(keywords: Array<string>) {
    return keywords.some(keyword => {
      return keyword.includes(this.searchKeyword);
    });
  }

  clearFilters() {
    this.searchCompany = '';
    this.searchLocation = '';
    this.searchKeyword = '';
  }

  showCompany(company: Company) {
    const companyId = company ? company['_id'].$oid : null;

    this.router.navigate(['company', companyId]);
  }

}
