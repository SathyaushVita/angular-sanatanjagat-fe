import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { 
    
  }



  data = null;
Register(data:any): Observable<any> {

  return this.httpClient.post(URL+"register_login", data);
}




VerifyOtp(data: any): Observable<any> {
  return this.httpClient.post(URL+"verify_login", data);
}



ResendOtp(data: any): Observable<any> {
  return this.httpClient.post(URL+"verify_login", data);
}

}
