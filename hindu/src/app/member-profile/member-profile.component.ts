

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NotificationHelper } from '../commons/notification';




@Component({
  selector: 'app-member-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzUploadModule],
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  memberform!: FormGroup;
  templeId:any;
  bannerFileList: NzUploadFile[] = [];
  userId: any



  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private notificationHelper: NotificationHelper,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MemberProfileComponent>
  ) {
    this.templeId = data.templeId;
  }

  ngOnInit():void{
    this.initializeForm(),
    this.getProfileData()


  }
  initializeForm(): void {
    this.memberform = this.fb.group({
      full_name: ["", Validators.required],
      father_name: ['', Validators.required],
      profile_pic: ['',],
      contact_number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      gender:['',Validators.required],
      // dob: ['',Validators.required],
      temple: this.templeId,
      user : localStorage.getItem('user'),
      email:[''],
      surname:[''],
      is_member:'true'


    });

  }

  getProfileData() {
    this.userId = localStorage.getItem('user');
    this.userservice.profiledata(this.userId).subscribe((response: any) => {
      this.memberform.patchValue({
        full_name: response.full_name,
        father_name: response.father_name,
        gender: response.gender,
        // dob: response.dob,
        contact_number: response.contact_number,
        email: response.email,
        // marital_status:response.marital_status,
        // gotram:response.gotram,
        // siblings:response.siblings,
        // children:response.children,
        // wife:response.wife,
        // husband:response.husband,
        // account_type:response.account_type


      });

      
    });
  }



  onSubmit(): void {
      const userId = localStorage.getItem('user');
      const connectdata  = this.memberform.value;

      if (this.memberform.invalid) {
        this.memberform.markAllAsTouched();
        return;
      }

      this.userservice.memberupdate(connectdata, userId).subscribe(
        response => {
          console.log('Member added successfully:', response);
          this.notificationHelper.showSuccessNotification('Add Member Success', '');
          this.memberform.reset();
          this.dialogRef.close();
          localStorage.setItem('is_member', 'true')
        },
        error => {
          console.error('Error adding member:', error);
          this.memberform.markAllAsTouched();


          const errorMessage = error?.error?.message || error?.error?.detail || JSON.stringify(error?.error) || 'An error occurred. Please try again.';
          this.notificationHelper.showErrorNotification('Member Update Failed', errorMessage);
        }
      );
  }



  handleBannerFileChange(info: NzUploadChangeParam): void {
    this.handleUpload(info, 'profile_pic');
  }

  handleUpload(info: NzUploadChangeParam, formControlName: string): void {
    const fileList = [...info.fileList];

    fileList.forEach((file: NzUploadFile) => {
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        this.memberform.patchValue({ [formControlName]: base64String });
      });
    });

    this.memberform.get(formControlName)?.setValue(fileList);

    if (formControlName === 'profile_pic') {
      this.bannerFileList = fileList;
    }
  }

  getBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
      let base64String = reader.result as string;
      base64String = base64String.split(',')[1];
      console.log('Base64 string:', base64String);
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }



handleBannerFileRemove(): void {
  if (this.bannerFileList.length === 0) {
    this.bannerFileList = [];
  }
}

}
