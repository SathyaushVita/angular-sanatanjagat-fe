



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TrainingService } from '../services/training.service';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';




@Component({
  selector: 'app-training2',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzSelectModule,NzFormModule,NzTreeModule,NgxSpinnerModule],
  templateUrl: './training2.component.html',
  styleUrl: './training2.component.css'
})
export class Training2Component {




  categories: any[] = [];
  continents: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  organizations: any[] = [];

  selectedContinent: string = '';
  selectedCountry: string = '';
  selectedState: string = '';
  selectedDistrict: string = '';
  countrydata: any;
  districtdata:any;
  nodes: NzTreeNodeOptions[] = [];
  searchValue: string = '';

  CountryOptions: any[]=[];
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  ContinentOptions:any[]=[];
  validatorForm!:FormGroup;
  selectedLocationId: any;
  selectedCategoryId:any;
  selectedsubCategoryId:any
  globaltemples: any[] = [];
  orginazationCategorydata:any;
  subCategories:any;
  displayName = 'display1';
  hasSubCategories: boolean = false;
  currentPage: number = 1;
  individualcategeory:any;



  constructor(private route:ActivatedRoute, private fb:FormBuilder,   private router:Router,private trainingservice:TrainingService,private spinner: NgxSpinnerService,
    private userservice:UserService,private authenticationService:AuthenticationService
  ) {}


  ngOnInit(): void {
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');

    if (this.selectedCategoryId) {
      this.trainingsubcategeory();
    } else {

      console.error('No category ID found in route parameters.');
    }

    this.loadLocations();
    // this.applyFilters();
    this.trainingsubcategeory();

    if (this.selectedCategoryId) {
      this.trainingCategorygetbyid(this.selectedCategoryId);
    }
  }




  onCategoryClick(event: NzFormatEmitEvent): void {
    const node = event.node!;
    if (node.origin.key === 'all-categories') {
      this.router.navigate(["training1",'AllTrainings'])
    } else {
      this.selectedCategoryId = node.origin.key;
      this.applyFilters();
    }
  }



  trainingCategorygetbyid(_id: any) {
    this.trainingservice.trainingCategorydata(_id).subscribe(
      (data:any) => {
        this.individualcategeory = data
      }
    )
  }







  trainingsubcategeory() {
    this.trainingservice.gettrainingsubCategories(this.selectedCategoryId).subscribe(
      (subCategories: any[]) => {
        this.nodes = this.createNodeTree(subCategories);


        this.subCategories = subCategories.sort((a, b) => a.name.localeCompare(b.name));

        this.nodes.sort((a, b) => a.title.localeCompare(b.title));
        // this.nodes.unshift({
        //   key: 'all-categories',
        //   title: 'All categories',
        //   value: ''
        // });
      },
      (err: any) => {
        console.error('Error loading categories:', err);
      }
    );
  }

  createNodeTree(data: any[]): NzTreeNodeOptions[] {
    return data.map(item => ({
      title: item.name,
      key: item._id,
      isLeaf: false
    }));
  }







  applyFilters() {
    this.currentPage = 1;
    this.organizations = [];
    this.loadTrainings();
  }




loadTrainings() {
  this.spinner.show();
  this.orginazationCategorydata = null;

  if (this.selectedLocationId && this.selectedCategoryId) {
    this.trainingservice.getTrainings(this.selectedCategoryId, this.selectedLocationId).subscribe(
      (data: any) => {
        this.organizations = data.results;
        console.log(this.organizations, "Filtered organizations with Category and Location123");
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching filtered organizations:', error);
        this.spinner.hide();
      }
    );
  } else if (this.selectedCategoryId) {
    console.log(this.selectedCategoryId, "aqwefrhj")
    this.trainingservice.getTrainings(this.selectedCategoryId, '').subscribe(
      (data: any) => {
        this.organizations = data.results;
        console.log(this.organizations, "Filtered organizations with Category987 ");
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching filtered organizations:', error);
        this.spinner.hide();
      }
    );
  } else if (this.selectedLocationId) {
    this.trainingservice.getTrainings('', this.selectedLocationId).subscribe(
      (data: any) => {
        this.organizations = data.results;
        console.log(this.organizations, "Filtered organizations with Location987 ");
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching filtered organizations:', error);
        this.spinner.hide();
      }
    );
  } else {
    this.trainingservice.getalltrainings().subscribe(
      (data: any) => {
        this.organizations = data;
        console.log(this.organizations, "Filtered organizations without Category or Location");
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching filtered organizations:', error);
        this.spinner.hide();
      }
    );
  }

  this.trainingservice.trainingCategorydata(this.selectedCategoryId).subscribe(
    data => {
      this.orginazationCategorydata = data;
    },
  );

  this.trainingservice.traininggetById(this.selectedCategoryId).subscribe(
    data => {
      this.orginazationCategorydata = data;
    },
  );
}




  loadLocations(): void {
    this.validatorForm = this.fb.group({
      continent: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', Validators.required],
      mandal: ['', Validators.required],
      village: ['', Validators.required]
    });

    this.trainingservice.getContinents().subscribe(
      (res) => {
        if (res  && Array.isArray(res)) {
          this.ContinentOptions = res.map((continent: any) => ({
            label: continent.name,
            value: continent._id
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          this.applyFilters()

        } else {
          console.error("Response is not in expected format", res);
        }
      },
      (err) => {
        console.error(err);
      }
    );



    this.validatorForm.get('continent')?.valueChanges.subscribe((continentID) => {
      console.log(continentID, "wdefrgh");
      if (continentID) {
        this.selectedLocationId = continentID;
        this.applyFilters()
        this.resetFormControls();

        console.log(continentID, "zaxsdfg");
        this.trainingservice.getCountries(continentID).subscribe(
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
        // this.resetStates();
        this.resetFormControls();

      }
    });

    this.resetFormControls();

    this.validatorForm.get('country')?.valueChanges.subscribe((countryID) => {
      if (countryID) {
        this.selectedLocationId = countryID;
        this.applyFilters()
        this.trainingservice.getStates(countryID).subscribe(
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
        // this.resetStates();
        this.resetDistrictMandalVillage();

      }
    });


    this.validatorForm.get('state')?.valueChanges.subscribe((stateID) => {
      if (stateID) {
        this.selectedLocationId = stateID;
        this.applyFilters()
        this.trainingservice.getDistricts(stateID).subscribe(
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
        // this.resetDistricts();
        this.resetMandalVillage();

      }
    });


    this.validatorForm.get('district')?.valueChanges.subscribe(districtID => {
      if (districtID) {
        this.selectedLocationId = districtID;
        this.applyFilters()
        console.log('district ID selected:', this.selectedLocationId);
      } else {
        this.resetDistricts();

      }
    });


  }




  CountryFormControls(): void {
    this.validatorForm.get('continent')?.reset();
    this.validatorForm.get('country')?.reset();

    this.validatorForm.get('state')?.reset();
    this.validatorForm.get('district')?.reset();
    // this.validatorForm.get('mandal')?.reset();
    // this.validatorForm.get('village')?.reset();

    // this.validatorForm.get('district')?.disable();
    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }

  // Helper methods for resetting and disabling form controls
  resetFormControls(): void {
    this.validatorForm.get('country')?.reset();

    this.validatorForm.get('state')?.reset();
    this.validatorForm.get('district')?.reset();
    // this.validatorForm.get('mandal')?.reset();
    // this.validatorForm.get('village')?.reset();

    // this.validatorForm.get('district')?.disable();
    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }

  resetDistrictMandalVillage(): void {
    this.validatorForm.get('state')?.reset();

    this.validatorForm.get('district')?.reset();
    // this.validatorForm.get('mandal')?.reset();
    // this.validatorForm.get('village')?.reset();

    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }

  resetMandalVillage(): void {
    this.validatorForm.get('district')?.reset();

    // this.validatorForm.get('mandal')?.reset();
    // this.validatorForm.get('village')?.reset();

    // this.validatorForm.get('village')?.disable();
  }

  resetStates() {
    this.StateOptions = [];
    this.validatorForm.get('state')?.reset();
    this.resetDistricts();
  }

  resetDistricts() {
    this.DistrictOptions = [];
    this.validatorForm.get('district')?.reset();
  }

  cleardata(){
    this.selectedLocationId = []
  }

  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId =null;
    this.applyFilters();
    this.CountryOptions = [];
    this.StateOptions = [];
    this.DistrictOptions = [];

    // this.loadTrainings();
  }



  navigateorganizationDetail(_id:string):void{
    this.router.navigate(["getbytraining",_id])
  }

  //   navigateTo(route: string): void {
  //   this.router.navigate([route]);
  // }






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
}



