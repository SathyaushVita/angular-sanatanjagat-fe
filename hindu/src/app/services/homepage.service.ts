import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private httpClient: HttpClient) { 
    
  }


  organizationsmain():Observable<any>{
    return this.httpClient.get(URL+"organizationsmain")
    
  }

  Trainingsmain():Observable<any>{
    return this.httpClient.get(URL+"trainingsmain")
  }

  eventsmain():Observable<any>{
    return this.httpClient.get(URL+"eventsmain")
  }



  homepage():Observable<any>{
    return this.httpClient.get(URL+"home")
  }
}
