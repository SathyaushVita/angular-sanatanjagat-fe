import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateprofileComponent } from '../updateprofile/updateprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";


  
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private subscription: Subscription = new Subscription();
  
 
  user: any = {};
  Organizations:any;
  trainingdata:any;
  eventdata:any;

  constructor(private userservice:UserService,private router:Router,private dialog:MatDialog, private sharedService:SharedService,
    private spinner: NgxSpinnerService
  ) { }

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

  getUserProfile(): void {
    this.spinner.show();
    const userId = localStorage.getItem('user'); 
    this.userservice.profiledata(userId).subscribe(
      (data) => {
        this.user = data;
        this.Organizations = data.Organization
        this.eventdata =data.events
        this.trainingdata =data.Training
        console.log("11111111111111111",this.user)
        this.spinner.hide();
        
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.spinner.hide();
      }
    );
  }

  navigateorganizationDetail(_id:string):void{
    this.router.navigate(["getbyorganization",_id])
  }

  navigateeventDetail(_id:string):void{
    this.router.navigate(["getbyevents",_id])
  }

  navigatetrainigDetail(_id:string):void{
    this.router.navigate(["getbytraining",_id])
  }





  familyimages: any;

  openmemberDialog(): void {
    console.log('sssssssssss');
    const dialogRef = this.dialog.open(UpdateprofileComponent, {
      data: { displayName: 'updateprofile' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
