

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NotificationHelper } from '../commons/notification';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-trainer-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzUploadModule,NgxSpinnerModule],
  templateUrl: './trainer-update.component.html',
  styleUrls: ['./trainer-update.component.css'] 
})
export class TrainerUpdateComponent implements OnInit {

  memberform!: FormGroup;
  connectForm!: FormGroup;
  templeId: any;
  certificateFileList: NzUploadFile[] = [];
  isMemberIn: boolean = false; // Change this according to your logic

  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private notificationHelper: NotificationHelper,
    private spinner: NgxSpinnerService,
  
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TrainerUpdateComponent>
  ) {
    this.templeId = data.templeId; 
    console.log('Temple ID:', this.templeId);
  }

  ngOnInit(): void {
    this.isMemberUser();
    this.initializeForms();
  }


  initializeForms(): void {
    this.memberform = this.fb.group({
      full_name: [""],
      father_name: ["", Validators.required],
      user_type: ['ADMIN'],
      training_type: ['offline', Validators.required],
      email: [''],
      contact_number: ['', Validators.required],
      temple: [this.templeId],
      user: [localStorage.getItem('user')],
      certificate: ['', Validators.required],
      gender: ['MALE', Validators.required],
      is_member:'true',
      surname:['']
    });

    this.connectForm = this.fb.group({
      user_type: ['ADMIN'], 
      certificate: [null, Validators.required],
      user: [localStorage.getItem('user')],
      temple: [this.templeId],
    });
  }


  isMemberUser(): void {
    this.isMemberIn = localStorage.getItem("is_member") === "true";
  }


  onSubmit(): void {
    if (!this.isMemberIn) {
      this.spinner.show();
      console.log("qwdefh")
      if (this.memberform.invalid) {
        this.memberform.markAllAsTouched();
        return;
      }

      const userId = localStorage.getItem('user');      
      const memberData = this.memberform.value; 

      this.userservice.memberupdate(memberData, userId).subscribe(
        response => {
          console.log('Trainer added successfully:', response);
          this.spinner.hide(); 
          this.notificationHelper.showSuccessNotification('Trainer Registration Successful', '');
          localStorage.setItem('is_member', 'true');
          this.memberform.reset();
          this.dialogRef.close();
        },
        error => {
          console.error('Error adding member:', error);
          this.spinner.hide(); 
          this.memberform.markAllAsTouched();
          // this.notificationHelper.showErrorNotification('Trainer Registration Failed', 'Please try again.');
          const errorMessage = error?.error?.message || error?.error?.detail || JSON.stringify(error?.error) || 'An error occurred. Please try again.';
          this.notificationHelper.showErrorNotification('Trainer Update Failed', errorMessage);
        }
      );
    } else {
      if (this.connectForm.invalid) {
        this.connectForm.markAllAsTouched();
        return;
      }

      const userId = localStorage.getItem('user');      
      const updateData = this.connectForm.value; 

      this.userservice.memberupdate(updateData, userId).subscribe(
        response => {
          console.log('Trainer updated successfully:', response);
          this.spinner.hide(); 
          this.notificationHelper.showSuccessNotification('Trainer Update Successful', '');
          this.connectForm.reset();
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating Trainer:', error);
          this.spinner.hide(); 
          this.connectForm.markAllAsTouched();
          // this.notificationHelper.showErrorNotification('Trainer Update Failed', 'Please try again.');
          const errorMessage = error?.error?.message || error?.error?.detail || JSON.stringify(error?.error) || 'An error occurred. Please try again.';
          this.notificationHelper.showErrorNotification('Trainer Update Failed', errorMessage);
        }
      );
    }
  }


  handleFileChange(info: NzUploadChangeParam, formControlName: string): void {
    this.handleUpload(info, formControlName);
  }


  handleUpload(info: NzUploadChangeParam, formControlName: string): void {
    const fileList = [...info.fileList];

    fileList.forEach((file: NzUploadFile) => {
      if (file.originFileObj) {
        this.getBase64(file.originFileObj, (base64String: string) => {
          file['base64'] = base64String;
          if (!this.isMemberIn) {
            this.memberform.patchValue({ [formControlName]: base64String });
          } else {
            this.connectForm.patchValue({ [formControlName]: base64String });
          }
        });
      }
    });

    if (formControlName === 'certificate') {
      this.certificateFileList = fileList;
      if (!this.isMemberIn) {
        this.memberform.get('certificate')?.setValue(fileList);
      } else {
        this.connectForm.get('certificate')?.setValue(fileList);
      }
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
}
