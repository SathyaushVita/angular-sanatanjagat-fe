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
import { TrainingService } from '../services/training.service';
import { EventService } from '../services/event.service';
import { MemberProfileComponent } from '../member-profile/member-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService ,NgxSpinnerModule} from 'ngx-spinner';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PictureTwoTone } from '@ant-design/icons-angular/icons';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-add-event',
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
    NzIconModule,
    NgxSpinnerModule
  ],
    templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {



eventform!:FormGroup;
CountryOptions: any[] = [];
StateOptions: any[] = [];
DistrictOptions: any[] = [];
MandalOptions: any[] = [];
VillageOptions: any[] = [];
goshalaCategoryoptions:any[]=[];
bannerFileList: NzUploadFile[] = [];
imageLocation: string = '';
fileList: NzUploadFile[] = [];

formattedEndDateMin: any

  displayName = 'organization';


constructor(private eventService:EventService,
  private fb:FormBuilder,
  private router:Router,
  private locationservice:LocationService,
  private spinner: NgxSpinnerService,

){ const currentDate = this.getsFormattedMinDate();
  this.formattedEndDateMin = currentDate; // Default to today
  }

ngOnInit():void{


  this.fetchallaCategories();


  this.eventform = this.fb.group({

    name: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date:['', Validators.required],
    start_time: ['', Validators.required],
    end_time:['', Validators.required],
    contact_name: ['',Validators.required],
    contact_phone:  ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
    contact_email: ['',Validators.required],
    desc: ['',Validators.required],
    // status: [''],
    address: ['', Validators.required],
    image_location: ['',Validators.required],
    category: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    district: ['', Validators.required],
    mandal: ['', Validators.required],
    object_id: ['', Validators.required],
    map_location: [''],
    user:localStorage.getItem('user'),
    status: ['INACTIVE'],

  });



  this.locationservice.GetAllCountries().subscribe(
    (res: any) => {
      if (res && Array.isArray(res.data)) {
        this.CountryOptions = res.data.map((country: any) => ({
          label: country.name,
          value: country._id
        }));
      } else {
        console.error("Response data is not an array type:", res);
      }
    },
    (err) => {
      console.error("Error fetching countries:", err);
    }
  );
  

  this.eventform.get('country')?.valueChanges.subscribe(countryID =>{
    if (countryID){
      this.locationservice.getbyStates(countryID).subscribe(
        (res: any) => {
          if (res && Array.isArray(res.results)) {
            this.StateOptions = res.results.map((state: any) => ({
              label: state.name,
              value: state._id
            }));
            this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));

          }
          else {
            console.error("response is not an array type",res)
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.eventform.get('state')?.reset();
      this.eventform.get('state')?.enable();
      this.eventform.get('district')?.reset();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('village')?.reset();
      this.eventform.get('district')?.disable();
      this.eventform.get('mandal')?.disable();
      this.eventform.get('village')?.disable();
    } else {
      // If no country selected, disable and clear state, district, mandal, and village select
      this.eventform.get('state')?.reset();
      this.eventform.get('state')?.disable();
      this.eventform.get('district')?.reset();
      this.eventform.get('district')?.disable();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('mandal')?.disable();
      this.eventform.get('village')?.reset();
      this.eventform.get('village')?.disable();
    }
  });


  this.eventform.get('state')?.valueChanges.subscribe(stateID => {
    if(stateID){
      this.locationservice.getdistricts(stateID).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.DistrictOptions = res.map((district:any) => ({
              label:district.name,
              value:district._id
            }));
            this.DistrictOptions.sort((a,b) =>a.label.localeCompare(b.label));
          }
          else {
            console.error("response is not an array type",res)
          }
        },
        (err) =>{
          console.log(err);
        }

      );
      this.eventform.get('district')?.enable();
      this.eventform.get('district')?.reset();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('village')?.reset();
      this.eventform.get('mandal')?.disable();
      this.eventform.get('village')?.disable();
    }
    else {
      this.eventform.get('district')?.enable();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('village')?.reset();
      this.eventform.get('mandal')?.disable();
      this.eventform.get('village')?.disable();
    }
  });

  this.eventform.get('district')?.valueChanges.subscribe((districrID => {
    if (districrID){
      this.locationservice.getblocks(districrID).subscribe(res=>{
        if (Array.isArray(res)) {
          this.MandalOptions = res.map((mandal:any) =>({
            label:mandal.name,
            value:mandal._id
          }));
          this.MandalOptions.sort((a,b) =>a.label.localeCompare(b.label));
        }
        else {
          console.error("response is not an array type",res)
        }

      },
      (err) =>{
        console.log(err);
      }
    );
    this.eventform.get('mandal')?.enable();
    this.eventform.get('mandal')?.reset();
    this.eventform.get('village')?.disable();
    this.eventform.get('village')?.reset();
    }
    else{
    this.eventform.get('mandal')?.enable();
    this.eventform.get('mandal')?.reset();
    this.eventform.get('village')?.disable();
    this.eventform.get('village')?.reset();
    }
  }));


  this.eventform.get('mandal')?.valueChanges.subscribe((mandalId => {
    if (mandalId){
      this.locationservice.getvillages(mandalId).subscribe( res => {
        if (Array.isArray(res)){
        this.VillageOptions = res.map((object_id:any) => ({
          label:object_id.name,
          value:object_id._id
        }));
        this.VillageOptions.sort((a,b)=>a.label.localeCompare(b.label));
      }
      else {
        console.error("response is not an array type",res)
      }

    },
    (err) =>{
      console.log(err)
    }
      );
      this.eventform.get('object_id')?.enable();
      this.eventform.get('object_id')?.reset();
    }
    else {
      this.eventform.get('object_id')?.disable();
      this.eventform.get('object_id')?.reset();
    }
  }));


}


fetchallaCategories():void{
  this.eventService.getEventCategory().subscribe(
    (res) => {
      res.forEach((category:any) =>{
        this.goshalaCategoryoptions.push({
          label:category.name,
          value:category._id
        })
      })
    },
    (err) => {
      console.log(err)
    }
  )
}

eventdata:any;

onSubmit() {
  this.spinner.show();
  if(this.eventform.valid){


    const { country, state, district, mandal, ...EventData } = this.eventform.value;
    this.eventService.addevent(EventData)
    // this.router.navigate(["villages",GoshalaData.object_id])

    .subscribe(response =>{
      this.spinner.hide();
      console.log("goshala added succesw fully",response)
      this.eventdata = EventData;
      this.displayName = "Submission";
      // this.router.navigate(["home"])
      },
      (err)=> {
        console.log(err)
        this.spinner.hide();
      }

    )
  }
  else{
    console.log("form is not valid")

    this.eventform.markAllAsTouched();
    this.spinner.hide();

  }

 }



 handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/noImageDataImage.jpg';
}

openMap(url: string): void {
  window.open(url, '_blank');
}

//  handleBannerFileRemove(): void {
//   if (this.bannerFileList.length === 0) {
//     this.bannerFileList = [];
//   }
// }


//  handleBannerFileChange(info:NzUploadChangeParam):void {
//   this.handleUpload(info, 'bannerImage');
//  }



//  handleUpload(info: NzUploadChangeParam, formControlName: string): void {
//   const fileList = [...info.fileList];

//   fileList.forEach((file: NzUploadFile) => {
//     this.getBase64(file.originFileObj!, (base64String: string) => {
//       file['base64'] = base64String;
//       this.eventform.patchValue({ image_location: base64String });
//     });
//   });

//   this.eventform.get(formControlName)?.setValue(fileList);

//   if (formControlName === 'images') {
//     this.fileList = fileList;
//   } else if (formControlName === 'bannerImage') {
//     this.bannerFileList = fileList;
//   }
//  console.log('image submit', this.eventform.value);
// }





handleBannerFileRemove(): void {
  // Clear the file list and reset the form control value
  this.bannerFileList = [];
  this.eventform.get('image_location')?.reset();
  this.eventform.get('image_location')?.markAsTouched(); // To show validation error immediately
}

handleBannerFileChange(info: NzUploadChangeParam): void {
  const fileList = [...info.fileList];

  if (info.file.status === 'removed') {
    // If the file is removed, clear the form control
    this.handleBannerFileRemove();
  } else {
    // Handle file upload
    fileList.forEach((file: NzUploadFile) => {
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        this.eventform.patchValue({ image_location: base64String });
      });
    });

    this.eventform.get('bannerImage')?.setValue(fileList);
    this.bannerFileList = fileList;
  }

  console.log('image submit', this.eventform.value);
}





getBase64(file: File, callback: (base64String: string) => void): void {
  const reader = new FileReader();
  reader.onload = () => {
      let base64String = reader.result as string;
      // Extract base64 string without the data URI scheme
      base64String = base64String.split(',')[1];
      console.log('Base64 string:', base64String); // Print base64 string
      callback(base64String);
  };
  reader.readAsDataURL(file);
}


getsFormattedMinDate(): string {
  const currentDate = new Date();
  // Format the date to 'YYYY-MM-DD' to fit the date input type
  return currentDate.toISOString().split('T')[0];
}

onStartDateChange(): void {
  const startDateValue = this.eventform.get('start_date')?.value;

  if (startDateValue) {
    // Set the min for end_date to the selected start_date
    this.formattedEndDateMin = startDateValue;

    // Reset end_date if it is earlier than the new start_date
    const endDateValue = this.eventform.get('end_date')?.value;
    if (endDateValue && new Date(endDateValue) < new Date(this.formattedEndDateMin)) {
      this.eventform.get('end_date')?.setValue(null);
    }
  }
}


getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.eventform.patchValue({
          map_location: `https://www.google.com/maps?q=${lat},${lng}`,
        });
      },
      (error) => {
        console.error('Error getting location', error);
        alert('Unable to retrieve your location. Please try again.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}


}
