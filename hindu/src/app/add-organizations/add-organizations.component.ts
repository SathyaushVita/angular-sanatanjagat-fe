import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OrganizationsService } from '../services/organizations.service';
import { state } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NzUploadModule,NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationHelper } from '../commons/notification';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService,NgxSpinnerModule  } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for animations



@Component({
  selector: 'app-add-organizations',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NzUploadModule,
    NgxSpinnerModule
  ],
    templateUrl: './add-organizations.component.html',
  styleUrl: './add-organizations.component.css'
})
export class AddOrganizationsComponent {

  organizationForm!: FormGroup;
  orgLogoFileList: any[] = [];
  templeCategoryOptions: any[] = [];
  templePriorityOptions: any[] = [];
  templeStyleOptions: any[] = [];
  containsLocationDetails = false;
  countries: any;
  templeCountryOptions: any[] = [];
  templeStateOptions: any[] = [];
  templeDistrictOptions: any[] = [];
  templeMandalOptions: any[] = [];
  templeVillageOptions: any[] = [];
  countryID:any[]=[];
  formGroup: any;
  bannerFileList: NzUploadFile[] = [];
  imageLocation: string = '';
  fileList: NzUploadFile[] = [];
  villagedata: any;
  villageid:any;
  selectedLocationId:any;
  ContinentOptions:any[]=[];
  countrydata: any;
  districtdata:any;
  CountryOptions: any[]=[];
  StateOptions: any[]=[];
  DistrictOptions: any[]=[];
  formDisabled = false;
  combinedCategoryOptions: any[] = [];
  subcategoryToCategoryMap: { [key: string]: string } = {};
  subCategoryOptions: any[] = [];
  organization: any;
  loading: boolean = false;
  submittedOrganization: any;
  displayName = 'organization';
  slectedId: any;
  // selectedId: string = '';

  isOthers= false;
  mainCategory: any[] = [];
  subcategories: any[] | null = null;
  orgImageFileList: NzUploadFile[] = [];
  // orgLogoFileList: NzUploadFile[] = [];
  govtIdProofFileList: NzUploadFile[] = [];
  selectedCategoryLabel: string | undefined;









  // formGroup:any;

  constructor(private fb: FormBuilder,
    private organizationService: OrganizationsService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,

    private formBuilder: FormBuilder,
    private router:Router,
    private dialog:MatDialog,
    private notificationHelper: NotificationHelper,
  ) {

    this.organizationForm = this.fb.group({

      object_id:['', [Validators.required]],
      category_id: ['', [Validators.required]],
      sub_category_id: ['', [Validators.required]],
      continent: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      organization_name: ['', Validators.required],
      est_by: ['', Validators.required],
      chairman: ['', Validators.required],
      est_date: ['', Validators.required],
      reg_id: ['', Validators.required],
      location: ['', Validators.required],
      web_url: ['', Validators.required],
      org_detail: ['', Validators.required],
      mission: ['', Validators.required],
      org_images: ['', Validators.required],
      org_logo: [null, Validators.required],
      status: ['PENDING'],
      organization_members: ['', Validators.required],
      geo_site: ['DISTRICT'],
      user:localStorage.getItem('user')


     });
   }
   selectedId: string = '';

  ngOnInit() {
    this.fetchCategories();



    this.organizationForm.get('category_id')?.valueChanges.subscribe((mainCategoryId) => {
      console.log('Selected Main Category ID:', mainCategoryId);
      this.selectedId = mainCategoryId;
      this.isOthers = mainCategoryId === 'ee6d84e3-3f21-42db-8404-1cff8c00fcfa' ||
           mainCategoryId === '00ccbd6d-f2fb-4d18-9a07-eeb1cb38ff62';
      // this.isOthers = mainCategoryId === '5b0a74b6-71cc-4b8f-8bf2-46401b35a59c';

      console.log('Is "Others" category selected:', this.isOthers);

      if (this.isOthers) {
        this.organizationForm.get('sub_category_id')?.clearValidators(); 
      } else {
        this.organizationForm.get('sub_category_id')?.setValidators(Validators.required); 
      }
      this.organizationForm.get('sub_category_id')?.updateValueAndValidity();
      this.subcategories = [];
      this.organizationForm.get('sub_category_id')?.setValue(null); 

      // Fetch subcategories if it's not "Others"
      if (!this.isOthers && mainCategoryId) {
        this.fetchSubcategories(mainCategoryId);
      } else {
        this.subcategories = []; 
      }
    });

    this.organizationService.getContinents().subscribe(
      (res) => {
        // console.log(res,'kishsdhsjfdskfb');
        if (res && Array.isArray(res)) {
          this.ContinentOptions = res.map((continent: any) => ({
            label: continent.name,
            value: continent._id
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        } else {
          console.error("Response is not in expected format", res);
        }
      },
      (err) => {
        console.error(err);
      }
    );




    this.organizationForm.get('continent')?.valueChanges.subscribe((continentID) => {
      console.log(continentID, "wdefrgh");
      if (continentID) {
        this.selectedLocationId = continentID;
        this.CountryOptions = [];
        console.log(continentID, "zaxsdfg");
        this.resetFormControls();
        this.organizationService.getCountries(continentID).subscribe(
          data => {
            this.countrydata = data;

            console.log(this.countrydata, "this.countrydata");

            if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.countries && Array.isArray(this.countrydata.countries)) {
              this.CountryOptions = this.countrydata.countries.map((country: any) => ({
                label: country.name,
                value: country._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.CountryOptions, "2345678");
            } else {
              console.error("Response is not in expected format", this.countrydata);
            }
          },
          (err) => {
            console.error(err);
            this.resetFormControls();

          }
        );
        this.resetFormControls();

      }
    });
    this.resetFormControls();



    this.organizationForm.get('country')?.valueChanges.subscribe((countryID) => {
      if (countryID) {
        this.selectedLocationId = countryID;
        this. StateOptions = [];
        this.organizationService.getStates(countryID).subscribe(
          (data) => {
            this.countrydata = data;

            console.log(this.countrydata, "this.countrydata");

            if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.states && Array.isArray(this.countrydata.states)) {
              this.StateOptions = this.countrydata.states.map((state: any) => ({
                label: state.name,
                value: state._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.StateOptions, "State Options");
            } else {
              console.error("Response is not in expected format", this.countrydata);
            }
          },
          (err) => {
            console.error(err);
            this.resetDistrictMandalVillage();

          }
        );

      }
    });


    this.organizationForm.get('state')?.valueChanges.subscribe((stateID) => {
      if (stateID) {
        this.selectedLocationId = stateID;
        this.DistrictOptions = [];

        this.organizationService.getDistricts(stateID).subscribe(
          (data) => {
            this.districtdata = data;

            console.log(this.districtdata, "this.districtdata");

            if (this.districtdata && typeof this.districtdata === 'object' && this.districtdata.districts && Array.isArray(this.districtdata.districts)) {
              this.DistrictOptions = this.districtdata.districts.map((district: any) => ({
                label: district.name,
                value: district._id
              })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
              console.log(this.DistrictOptions, "District Options");
            } else {
              console.error("Response is not in expected format", this.districtdata);
            }
          },
          (err) => {
            console.error(err);
            this.resetMandalVillage();
          }
        );
        this.resetMandalVillage();

      } else {
        this.resetMandalVillage();
        this.DistrictOptions = []
      }
    });

    this.organizationForm.get('district')?.valueChanges.subscribe(districtID => {
      if (districtID) {
        this.selectedLocationId = districtID;
        console.log('district ID selected:', this.selectedLocationId);
      } else {
      }
    });

  }


  onSubmit() {
    if (this.organizationForm.valid) {
      this.spinner.show();

      const formValue = { ...this.organizationForm.value };
      if (this.isOthers) {
        formValue.sub_category_id = null;
      }

      this.organizationService.addorganization(formValue)
        .subscribe(
          response => {
            console.log('Organization added successfully:', response);
            this.notificationHelper.showSuccessNotification('Add Organization Success', '');
            this.organization = formValue;
            this.displayName = "submission";

            this.resetForm();

              this.formDisabled = false;
              this.spinner.hide();



          },
          error => {
            console.error('Error adding organization:', error);

            if (error.status === 400 && error.error.message === "Cannot create organization. Membership details are required. Update your profile and become a member.") {
              this.notificationHelper.showErrorNotification('Organization not added. Membership details are required.');
              this.openMemberDialog();
            } else {
              this.notificationHelper.showErrorNotification('Organization not added');

            }
            this.spinner.hide();

          }
        );
    } else {
      this.organizationForm.markAllAsTouched();
      console.log('Form is invalid.');
    }
  }

  openMemberDialog(): void {
    console.log('Opening member form dialog');
    const dialogRef = this.dialog.open(MemberProfileComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Member form dialog closed');
      if (result === 'success') {
        this.onSubmit();
      }
    });
  }



  resetForm() {
    this.organizationForm.reset();

    this.orgImageFileList = [];
    this.orgLogoFileList = [];
    this.govtIdProofFileList = [];

    this.organizationForm.patchValue({
      org_images: null,
      org_logo: null,
      govt_id_proof: null
    });
  }




  // fetchAllCategories(): void {
  //   this.organizationService.getCategories().subscribe(
  //     (res) => {
  //       if (res && Array.isArray(res)) {
  //         const categories = res.map((category: any) => ({
  //           label: category.name,
  //           value: category._id
  //         }));


  //         this.organizationService.getsubCategories().subscribe(
  //           (subRes) => {

  //             if (subRes && Array.isArray(subRes)) {
  //               const subCategories = subRes.map((subcategory: any) => {

  //                 this.subcategoryToCategoryMap[subcategory._id] = subcategory.category;
  //                 return {
  //                   label: `${subcategory.name}`,
  //                   value: subcategory._id,
  //                   isSubcategory: true
  //                 };
  //               });


  //               this.combinedCategoryOptions = [...categories, ...subCategories];
  //             } else {
  //               console.error("Invalid response format for subcategories");
  //             }
  //           },
  //           (err) => {
  //             console.error(err);
  //           }
  //         );
  //       } else {
  //         console.error("Invalid response format for categories");
  //       }
  //     },
  //     (err) => {
  //       console.error(err);
  //     }
  //   )
  // }

  // fetchAllSubCategories(): void {
  //   this.organizationService.getsubCategories().subscribe(
  //     (res) => {

  //       if (res && Array.isArray(res)) {
  //         this.subCategoryOptions = res.map((subcategory: any) => ({
  //           label: subcategory.name,
  //           value: subcategory._id
  //         }));
  //       } else {
  //         console.error("Invalid response format for subcategories");
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }






// handleOrgImageChange(info: NzUploadChangeParam): void {
//   this.handleUpload(info, 'org_images');
// }

// handleOrgLogoChange(info: NzUploadChangeParam): void {
//   this.handleUpload(info, 'org_logo');
// }


// handleGovtIdProofChange(info: NzUploadChangeParam): void {
//   this.handleUpload(info, 'govt_id_proof');
// }

// handleUpload(info: NzUploadChangeParam, formControlName: string): void {
//   const fileList = [...info.fileList];

//   fileList.forEach((file: NzUploadFile) => {
//     this.getBase64(file.originFileObj!, (base64String: string) => {
//       file['base64'] = base64String;
//       this.organizationForm.patchValue({ [formControlName]: base64String });
//     });
//   });

//   if (formControlName === 'org_images') {
//     this.orgImageFileList = fileList;
//   } else if (formControlName === 'org_logo') {
//     this.orgLogoFileList = fileList;
//   } else if (formControlName === 'govt_id_proof') {
//     this.govtIdProofFileList = fileList;
//   }

//   console.log('Form Values:', this.organizationForm.value);
// }






handleOrgImageChange(info: NzUploadChangeParam): void {
  if (info.file.status === 'removed') {
    this.organizationForm.get('org_images')?.reset();
    this.organizationForm.get('org_images')?.markAsTouched(); // Show validation error
    this.orgImageFileList = [];
  } else {
    this.handleUpload(info, 'org_images');
  }
}

handleOrgLogoChange(info: NzUploadChangeParam): void {
  if (info.file.status === 'removed') {
    this.organizationForm.get('org_logo')?.reset();
    this.organizationForm.get('org_logo')?.markAsTouched(); // Show validation error
    this.orgLogoFileList = [];
  } else {
    this.handleUpload(info, 'org_logo');
  }
}

handleUpload(info: NzUploadChangeParam, formControlName: string): void {
  const fileList = [...info.fileList];

  fileList.forEach((file: NzUploadFile) => {
    this.getBase64(file.originFileObj!, (base64String: string) => {
      file['base64'] = base64String;
      this.organizationForm.patchValue({ [formControlName]: base64String });
    });
  });

  if (formControlName === 'org_images') {
    this.orgImageFileList = fileList;
  } else if (formControlName === 'org_logo') {
    this.orgLogoFileList = fileList;
  } else if (formControlName === 'govt_id_proof') {
    this.govtIdProofFileList = fileList;
  }

  console.log('Form Values:', this.organizationForm.value);
}


getBase64(file: File, callback: (base64String: string) => void): void {
  const reader = new FileReader();
  reader.onload = () => {
    let base64String = reader.result as string;
    base64String = base64String.split(',')[1];
    callback(base64String);
  };
  reader.readAsDataURL(file);
}


onCategoryChange(event: any): void {
  const selectedCategory = event.target.value;
  const selectedCategoryOption = this.combinedCategoryOptions.find(option => option.value === selectedCategory);

  if (selectedCategoryOption?.isSubcategory) {
    this.organizationForm.get('category_id')?.clearValidators();
    this.organizationForm.get('category_id')?.updateValueAndValidity();
    this.organizationForm.get('sub_category_id')?.setValue(selectedCategory);
  } else {
    this.organizationForm.get('sub_category_id')?.setValue('');
    this.organizationForm.get('category_id')?.clearValidators();
    this.organizationForm.get('category_id')?.updateValueAndValidity();
  }

  console.log('Selected Category Option:', selectedCategoryOption);
}






CountryFormControls(): void {
  this.organizationForm.get('continent')?.reset();
  this.organizationForm.get('country')?.reset();

  this.organizationForm.get('state')?.reset();
  this.organizationForm.get('district')?.reset();
  // this.validatorForm.get('mandal')?.reset();
  // this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('district')?.disable();
  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

// Helper methods for resetting and disabling form controls
resetFormControls(): void {
  this.organizationForm.get('country')?.reset();

  this.organizationForm.get('state')?.reset();
  this.organizationForm.get('district')?.reset();
  // this.validatorForm.get('mandal')?.reset();
  // this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('district')?.disable();
  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

resetDistrictMandalVillage(): void {
  this.organizationForm.get('state')?.reset();

  this.organizationForm.get('district')?.reset();
  // this.validatorForm.get('mandal')?.reset();
  // this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

resetMandalVillage(): void {
  this.organizationForm.get('district')?.reset();

  // this.validatorForm.get('mandal')?.reset();
  // this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('village')?.disable();
}

resetStates() {
  this.StateOptions = [];
  this.organizationForm.get('state')?.reset();
  this.resetDistricts();
}

resetDistricts() {
  this.DistrictOptions = [];
  this.organizationForm.get('district')?.reset();
}

 


// fetchCategories(): void {
//   this.organizationService.getCategories().subscribe(
//     (res) => {
//       if (res && Array.isArray(res)) {
//         this.mainCategory = res.map((category: any) => ({
//           label: category.name,
//           value: category._id,
//         }));
//         console.log("Main categories populated:", this.mainCategory);
//       } else {
//         console.error("Invalid response format for main categories");
//       }
//     },
//     (err) => {
//       console.error("Error fetching main categories:", err);
//     }
//   );
//   this.organizationForm.get('category')?.valueChanges.subscribe((mainCategoryId) => {
//     console.log('Selected main category ID:', mainCategoryId);
//     this.slectedId  = mainCategoryId
//     console.log('Selected slectedId ID:', this.slectedId);
//     if (mainCategoryId === 'ee6d84e3-3f21-42db-8404-1cff8c00fcfa') {
//       this.isOthers = true;
//     }else {
//       this.isOthers = false;
//     }
//     if (mainCategoryId) {
//       this.organizationService.getorganizationsubCategories(mainCategoryId).subscribe(
//         (res) => {
//           console.log("Full Subcategories response:", res);
//           if (res && Array.isArray(res)) {
//             this.subcategories = res.map((Subcategory: any) => ({
//               label: Subcategory.name,
//               value: Subcategory._id,
//             }));
//             console.log("Subcategories populated:",this.subcategories);
//           } else {
//             console.error("Invalid response format for subcategories");
//             this.subcategories = [];
//           }
//         },
//         (err) => {
//           console.error("Error fetching subcategories:", err);
//           this.subcategories = [];
//         }
//       );
//     } else {
//       this.subcategories = [];
//     }
//   });
// }

fetchCategories(): void {
  this.organizationService.getCategories().subscribe(
    (res) => {
      if (res && Array.isArray(res)) {
        this.mainCategory = res.map((category: any) => ({
          label: category.name,
          value: category._id,
        }));
        console.log('Main categories populated:', this.mainCategory);
      } else {
        console.error('Invalid response format for main categories');
      }
    },
    (err) => {
      console.error('Error fetching main categories:', err);
    }
  );
}

fetchSubcategories(mainCategoryId: string): void {
  this.organizationService.getorganizationsubCategories(mainCategoryId).subscribe(
    
    (res) => {
      
      if (res && Array.isArray(res)) {
        this.subcategories = res.map((subcategory: any) => ({
          label: subcategory.name,
          value: subcategory._id,
        }));
        console.log('Subcategories populated:', this.subcategories);
      } else {
        console.error('Invalid response format for subcategories');
        this.subcategories = [];
      }
    },
    (err) => {
      console.error('Error fetching subcategories:', err);
      this.subcategories = [];
    }
  );
}






}

