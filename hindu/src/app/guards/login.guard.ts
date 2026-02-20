// import { CanActivateFn } from '@angular/router';
// import { Injectable, inject } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   CanDeactivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';



// @Injectable({
//   providedIn: 'root',
// })


// export const loginGuard: CanActivateFn = (route, state) => {
//   constr
//   return true;
// };


import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

// import { SignupComponent } from '../components/signup/signup.component';
// import { UserService } from '../services/userservice/user.service';
import { MatDialog } from '@angular/material/dialog';
// import { OnlymemberComponent } from '../components/member/onlymember/onlymember.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../services/user.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';

@Injectable({
  providedIn: 'root',
})
export class LoggedinguardGuard implements CanActivate {

  // commonService = inject(CommonService);

  constructor(private router: Router, private dialog: MatDialog, private userservice:UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');
    console.log('decfvgbn');
    if (user) {
      const ismember =this.userservice.isMemberIn
      if (ismember===false){
        // this.openmemberDialog();

      }
      return true;

    }
    console.log('aaaaaaaaaaaaaa');
    // this.router.navigate([route]);
    this.openSignupDialog();
    return false;
  }

  openSignupDialog(): void {
    console.log('sssssssssss');
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle after dialog close actions here
    });
  }
  // openmemberDialog(): void {
  //   console.log('sssssssssss');
  //   const dialogRef = this.dialog.open(MemberProfileComponent, {
  //     data: { displayName: 'signup' },
  //     autoFocus: false,
  //     backdropClass: 'dialog-backdrop',
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //   });
  // }
}



