import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  user_search: String;
  user_details: User[] = [];
  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
  }

  search_query(e) {
    const search_query = e.target.value;

    if (search_query.length > 0) {
      this.companyService.search_users_by_keywords(search_query).subscribe(res => {
        this.user_details = res;
        console.log('Search result', res);
      });
    } else {
      this.user_details = [];
    }
  }

  downloadResume(resumes) {
    const latest_resume_path = resumes[resumes.length - 1];
    this.companyService.fetch_resume_user(latest_resume_path);
  }

}
