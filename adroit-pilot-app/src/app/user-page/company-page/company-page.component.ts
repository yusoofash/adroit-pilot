import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService, UserService } from '../../services';
import { Company } from '../../models';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {

  company_details: Company;
  constructor(private route: ActivatedRoute,
    private loaderService: LoaderService,
    private userService: UserService) {
    this.loaderService.startLoader();
    this.route.params.subscribe(params => {
      const id = params.id;
      this.userService.getCompanyById(id)
        .subscribe(res => {
          this.loaderService.stopLoader();
          this.company_details = res;
        });
    });
   }

   get c() { return this.company_details; }

  ngOnInit() {
  }

}
