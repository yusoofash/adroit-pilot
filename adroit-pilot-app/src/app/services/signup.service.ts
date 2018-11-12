import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  registerStudent(studentDetails: User) {
    return this.http.post<User>(`${environment.apiEndpoint}/register/user`, { 'user': studentDetails })
      .pipe(
        catchError(this.handleError('registerStudent', []))
      );
  }

  registerCompany(companyDetails: Company) {
    return this.http.post<Company>(`${environment.apiEndpoint}/register/company`, { 'company': companyDetails })
      .pipe(
        catchError(this.handleError('registerCompany', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
