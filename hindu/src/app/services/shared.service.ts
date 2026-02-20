
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private triggerFetchprofileData = new Subject<void>();
  private triggerFetchorganizationData = new Subject<void>();


  triggerFetchprofileData$ = this.triggerFetchprofileData.asObservable(); 
  triggerFetchVillageData$ = this.triggerFetchorganizationData.asObservable();




  getUserProfile() { 
    this.triggerFetchprofileData.next();
  }

  getOrganizationDetails(){
    this.triggerFetchorganizationData.next();
  }

  
}
