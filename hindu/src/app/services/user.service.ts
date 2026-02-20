import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isMemberIn = false
  isadmin: any;

  
  

  constructor(private httpclient:HttpClient,private dialog:MatDialog) { 

  }

  isMemberUser() {
    return this.isMemberIn;
  }



  

  signup(userData: any): Observable<any> {
    return this.httpclient.post(URL+"register_login", userData);
  }

  verifyotp(userData: any): Observable<any> {
    return this.httpclient.post(URL+"verify_login", userData);
  }


  profiledata(id:any): Observable<any>{
    return this.httpclient.get(URL+"profile_get_by_id/"+id)
  }

  memberupdate(memberData: any, userId: any): Observable<any> {
    const url = `${URL}updateMemberDetails/`+userId;
    const data = { ...memberData,  };
    return this.httpclient.put(url, data);
  }



  updatetrainer(trainerData: any, userId: any): Observable<any>{
    return this.httpclient.put(URL+"updateMemberDetails/"+userId,trainerData)
    
    
  }

  showMemberModal(): void {
    this.openmemberDialog();
  }



  openmemberDialog(): void {
    console.log('sssssssssss');
    const dialogRef = this.dialog.open(MemberProfileComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Handle after dialog close actions here
    });
  }

  // deletenews(_id:any):Observable<any>{
  //   return this.httpclient.delete("organizations/"+_id+'/')
    
  // } 


  updateprofile(memberData: any, userId: any): Observable<any> {
    const url = `${URL}updateMemberDetails/`+userId;
    const data = { ...memberData,  };
  
    return this.httpclient.put(url, data);
  }
}
