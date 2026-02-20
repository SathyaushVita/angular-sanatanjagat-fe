import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { NotificationHelper } from '../commons/notification';


@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  profileForm!: FormGroup;
  userId: any;
  profileImage: string | ArrayBuffer | null = null;
  profile_pic: any;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<UpdateprofileComponent>,
    private http: HttpClient,
    private notificationHelper: NotificationHelper,

  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getProfileData();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      full_name: ['', Validators.required],
      father_name: [''],
      gender: [''],
      // dob: [''],
      contact_number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],


      profile_pic: [''],
      email: ['', [Validators.required, Validators.email]],
      surname:['', Validators.required]
    });
  }

  getProfileData() {
    this.userId = localStorage.getItem('user');
    this.userservice.profiledata(this.userId).subscribe((response: any) => {
      this.profileForm.patchValue({
        full_name: response.full_name,
        father_name: response.father_name,
        gender: response.gender,
        dob: response.dob,
        contact_number: response.contact_number,
        email: response.email,
        surname:response.surname
      });

      this.profile_pic = response.profile_pic;
      if (this.profile_pic) {
        this.convertToBase64(this.profile_pic)
          .then(base64 => {
            this.profileImage = base64;
            this.profileForm.patchValue({
              profile_pic: base64
            });
          })
          .catch(error => {
            console.error("Error converting to base64:", error);
          });
      }
    });
  }

  convertToBase64(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const cleanBase64 = base64String.replace(/^data:(application\/octet-stream|image\/[a-z]+);base64,/, '');
          resolve(cleanBase64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.userservice.updateprofile(this.profileForm.value, this.userId).subscribe(
        (response: any) => {
          this.sharedService.getUserProfile();
          this.notificationHelper.showSuccessNotification('Update Successful', '');
          this.router.navigate(['/profile', this.userId]);
          this.dialogRef.close();
        },
        error => {
          console.log('Failed to update profile!');
          const errorMessage = error?.error?.message || error?.error?.detail || JSON.stringify(error?.error) || 'An error occurred. Please try again.';
          this.notificationHelper.showErrorNotification('Trainer Update Failed', errorMessage);
        }
      );
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result?.toString() || '';
        const base64String = base64StringWithPrefix.split(',')[1];
        this.profileImage = base64String;
        this.profileForm.patchValue({
          profile_pic: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profile_pic') as HTMLElement;
    fileInput.click();
  }
}

