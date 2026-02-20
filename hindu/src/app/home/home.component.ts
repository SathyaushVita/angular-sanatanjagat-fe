import { Component } from '@angular/core';
import { WorldMapComponent } from '../world-map/world-map.component';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { HomepageService } from '../services/homepage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { TrainerUpdateComponent } from '../trainer-update/trainer-update.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WorldMapComponent, MapsModule,CommonModule,MatIconModule,NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  organizations: any[] = [];
  training: any[] = [];
  events: any[] = [];

  constructor(private homepageservice:HomepageService,private router:Router,private authenticationService:AuthenticationService,private userservice:UserService, private dialog:MatDialog
    ,private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchhome();
  }



  fetchhome(): void {
    this.spinner.show();
    this.homepageservice.homepage().subscribe(
      (response: any) => {
        this.organizations = response.organizationCategories;
        this.events = response.eventCategories;
        this.training = response.trainingCategories;
        this.spinner.hide();

      },
      (error) => {
        console.error('Error fetching organizations:', error);
        this.spinner.hide();

      }
    );
  }


   shareUrl: string = 'https://thehindusworld.com/home';
  imageUrl: string = 'https://sathayushstorage.blob.core.windows.net/sathayush/event%20category/7426b52b-4046-4fe8-9d04-278a9d3562f8/pushkaralu.jpg';

  




  shareNews() {
    if (this.isShareAvailable()) {
      // Mobile devices and supported browsers (Web Share API)
      this.shareOnMobile();
    } else {
      // Fallback for desktop (Share via social media links)
      this.shareOnSocialMedia();
    }
  }

  isShareAvailable(): boolean {
    // Check if the Web Share API is available in the browser (mostly for mobile)
    return navigator && (navigator as any).share !== undefined;
  }

  shareOnMobile() {
    // Create a share message including both the URL and image URL
    const message = `Check this out!\n\nURL: ${this.shareUrl}\nImage: ${this.imageUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        text: message, // Include both URL and image URL as text
        url: this.shareUrl, // Also pass the URL
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      console.log('Web Share API is not supported on this device.');
    }
  }

  shareOnSocialMedia() {
    const encodedUrl = encodeURIComponent(this.shareUrl);
    const encodedImage = encodeURIComponent(this.imageUrl);

    // Facebook: Use quote for custom message along with URL and image
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(`Check this out!\n\nImage: ${this.imageUrl}\nURL: ${this.shareUrl}`)}`;

    // Twitter: Use text to include both the image URL and the page URL
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`Check this out!\n\nImage: ${this.imageUrl}\nURL: ${this.shareUrl}`)}`;

    // WhatsApp: Share text containing both the image URL and the page URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check this out!\n\nImage: ${this.imageUrl}\nURL: ${this.shareUrl}`)}`;

    // Open share links in new tabs
    window.open(facebookUrl, '_blank');
    window.open(twitterUrl, '_blank');
    window.open(whatsappUrl, '_blank');
  }









  navigateTo(route: string): void {

    const isMemberIn = localStorage.getItem("is_member") === "true";
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }

    if (isMemberIn) {
      this.router.navigate([route]);
    } else {

      this.userservice.showMemberModal();
    }
  }




  openmemberDialog(): void {
    const isMember = localStorage.getItem('is_member');

    if (isMember === 'true') {
      console.log('Profile already completed, no need to show the dialog.');
      return;
    }

    const dialogRef = this.dialog.open(MemberProfileComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog was closed');
    });
  }



  navigateToOrganizations(){
        this.router.navigate(['globalorganizations','Allorganizations']);
  }

  navigateToevent(){
    this.router.navigate(['event','AllEvents']);
  }

  navigateToTraining(){
    this.router.navigate(["training1",'AllTrainings']);

  }





  navigateToCategoryDetail(templeCategory: any): void {
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }

    this.router.navigate(["training2", templeCategory._id], { state: { templeCategory } })
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }


  navigateToeventCategoryDetail(templeCategory: any): void {
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }

    this.router.navigate(["event", templeCategory._id], { state: { templeCategory } })
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }





  navigateToOrganizations1(templeCategory: any): void {
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }

    this.router.navigate(["subglobalorganizations", templeCategory._id], { state: { templeCategory } })
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

}
