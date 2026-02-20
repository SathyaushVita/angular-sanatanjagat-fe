import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../constants';





@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  // showConnectYourVillageModal() {
  //   this.modalservice.openModal(
  //     ConnectyourorginComponent,
  //     'Connect Your Village'
  //   );
  // }

  addcomment(commentdata:any):Observable<any>{
    return this.http.post(URL+"comment",commentdata)
  }

  getcomment():Observable<any>{
    return this.http.get(URL+"comment")
  }

  
  getCurrentUser() {
    return localStorage.getItem('user');
  }


 
}