import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MatDialog } from '@angular/material/dialog';

import { SignupComponent } from '../signup/signup.component';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NzModalModule,   NzLayoutModule, NzMenuModule,  NzAvatarModule, NzDropDownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private subscription: Subscription = new Subscription();


  isSmallScreen = window.innerWidth < 992;


  constructor(private dialog:MatDialog,protected authenticationService:AuthenticationService,private userservice:UserService,private router:Router,private sharedService:SharedService){
  }

handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/profile1.webp';
}
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 992;
  }

  getButtonClasses(): string[] {
    if (this.isSmallScreen) {
      return ['nav-link'];
    } else {
      return ['btn', 'btn-primary', 'rounded-pill'];
    }
  }

            
  ngOnInit(): void {
    this.subscription.add(
      this.sharedService.triggerFetchprofileData$.subscribe(() => {
        this.getUserProfile();
      })
    );
    
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isLoggedIn: boolean = false;
  sidebarOpen: boolean = false;

 

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { displayName: 'signup' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  doLogout(){
    this.authenticationService.logout();
  }






  user: any = {};
  getUserProfile(): void {
    const userId = localStorage.getItem('user'); 
    this.userservice.profiledata(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }





  navigateTo(route: string): void {
    const ismember = localStorage.getItem('is_member') === 'true'; 
    console.log("hsjfdjdkjfkdfjhdhfu",ismember)
  
    if (ismember) {
      this.router.navigate([route]);
    } else {
      this.userservice.showMemberModal();
    }
  }

  navigateToTempleFilters():void{
    this.router.navigate(["training1",'AllTrainings'])  
}

navigateToEventFilters():void{
  this.router.navigate(["event",'AllEvents'])  
}


navigateToorganizationFilters():void{
  this.router.navigate(["globalorganizations",'Allorganizations'])  
}
  
}

