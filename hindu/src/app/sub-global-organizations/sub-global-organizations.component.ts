import { Component , HostListener, OnDestroy, OnInit} from '@angular/core';
import { OrganizationsService } from '../services/organizations.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Subscription, interval, Subject } from 'rxjs';
import { switchMap, takeUntil, finalize } from 'rxjs/operators';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sub-global-organizations',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzSelectModule,NzFormModule,NzTreeModule,NgxSpinnerModule],
  templateUrl: './sub-global-organizations.component.html',
  styleUrl: './sub-global-organizations.component.css'
})
export class SubGlobalOrganizationsComponent {

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
  // globaltemples: any[] = [];
  orginazationsCategorydata:any
  currentPage: number = 1;
  isLoading: boolean = true;
  isLoadingNextPage: boolean = false;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>();
  subCategories: any[] = [];
  categoryData:any;

  constructor(private organizationService: OrganizationsService,private route:ActivatedRoute, private fb:FormBuilder,   private router:Router,private spinner: NgxSpinnerService,
    private userservice:UserService,private authenticationService:AuthenticationService
  ) {}




  ngOnInit(): void {
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');

    if (this.selectedCategoryId) {
      this.trainingsubcategeory();
    } else {

      console.error('No category ID found in route parameters.');
    }
  this.trainingsubcategeory();
    this.loadLocations();

    if (this.selectedCategoryId) {
      this.getOrganizationCategoryData(this.selectedCategoryId);
    }
  
  }

  onCategoryClick(event: NzFormatEmitEvent): void {
    const node = event.node!;
    if (node.origin.key === 'all-categories') {
      this.router.navigate(["globalorganizations",'Allorganizations'])
    } else {
      this.selectedCategoryId = node.origin.key;
      this.applyFilters();
    }
  }


  getOrganizationCategoryData(_id: string): void {
    this.organizationService.orginazationCategorydata(_id).subscribe(
      (response) => {
        this.categoryData = response;
      },
      (error) => {
        console.error('Error fetching category data:', error);
      }
    );
  }









  trainingsubcategeory() {
    this.organizationService.getorganizationsubCategories(this.selectedCategoryId).subscribe(
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



  cleardata(){
    this.selectedCategoryId = []
  }

  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId = null;
    this.applyFilters();
    this.CountryOptions = [];
    this.StateOptions = [];
    this.DistrictOptions = [];

  }

  applyFilters() {
    this.currentPage = 1;
    this.organizations = [];
    this.loadOrganizations();

  }



  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/noImageDataImage.jpg';
  }


  loadOrganizations() {
    this.spinner.show();
    if (this.selectedLocationId && this.selectedCategoryId ) {
        this.organizationService.getOrganizations( this.selectedCategoryId,this.selectedLocationId,this.currentPage).subscribe(
            (data: any) => {
                this.organizations = data.results;
                this.organizations.sort((a: any, b: any) => {
                  return a.organization_name.toLowerCase().localeCompare(b.organization_name.toLowerCase());
                });
                console.log(this.organizations, "Filtered orginazations with Category and Location123");
                this.spinner.hide(); // Hide spinner after successful fetch

            },
            (error) => {
                console.error('Error fetching filtered orginazations:', error);
                this.spinner.hide(); // Hide spinner after successful fetch

            }
        );
    }

    else if (this.selectedCategoryId) {
      console.log(this.selectedCategoryId,"aqwefrhj")
      this.organizationService.getOrganizations(this.selectedCategoryId,'',this.currentPage).subscribe(
          (data: any) => {
              this.organizations = data.results;
              this.organizations.sort((a: any, b: any) => {
                return a.organization_name.toLowerCase().localeCompare(b.organization_name.toLowerCase());
              });
              console.log(this.organizations, "Filtered orginazations with Category987 ");
              this.spinner.hide(); // Hide spinner after successful fetch

          },
          (error) => {
              console.error('Error fetching filtered orginazations:', error);
              this.spinner.hide(); // Hide spinner after successful fetch

          }
      );
  }
     else if (this.selectedLocationId) {
        this.organizationService.getOrganizations('',this.selectedLocationId,this.currentPage).subscribe(
            (data: any) => {
                this.organizations = data.results;
                this.organizations.sort((a: any, b: any) => {
                  return a.organization_name.toLowerCase().localeCompare(b.organization_name.toLowerCase());
                });
                console.log(this.organizations, "Filtered orginazations with Category987 ");
                this.spinner.hide(); // Hide spinner after successful fetch

            },
            (error) => {
                console.error('Error fetching filtered orginazations:', error);
                this.spinner.hide(); // Hide spinner after successful fetch

            }
        );
    } else {
        this.organizationService.getallorganaztions(this.currentPage).subscribe(
            (data: any) => {
                this.organizations = data.results;
                this.organizations.sort((a: any, b: any) => {
                  return a.organization_name.toLowerCase().localeCompare(b.organization_name.toLowerCase());
                });

                this.currentPage++;
                console.log(this.organizations, "Filtered orginazations without Category or Location");
                this.spinner.hide(); // Hide spinner after successful fetch


            },
            (error) => {
                console.error('Error fetching filtered orginazations:', error);
                this.spinner.hide(); // Hide spinner after successful fetch

            }
        );


    }

    this.organizationService.orginazationCategorydata(this.selectedCategoryId).subscribe(
      data => {
        this.orginazationsCategorydata = data;
        this.spinner.hide(); // Hide spinner after successful fetch

      },

    );

    this.organizationService.orginazationsubCategorydata(this.selectedCategoryId).subscribe(
      data => {
        this.orginazationsCategorydata = data;
        this.spinner.hide(); // Hide spinner after successful fetch

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

    this.organizationService.getContinents().subscribe(
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
        // this.resetStates();
        this.resetFormControls();

      }
    });
    this.resetFormControls();


    this.validatorForm.get('country')?.valueChanges.subscribe((countryID) => {
      if (countryID) {
        this.selectedLocationId = countryID;
        this.applyFilters()
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
          }
        );
        this.resetDistrictMandalVillage();

        // this.resetStates();
        this.resetDistrictMandalVillage();

      }
    });


    this.validatorForm.get('state')?.valueChanges.subscribe((stateID) => {
      if (stateID) {
        this.selectedLocationId = stateID;
        this.applyFilters()
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

  resetStates() {
    this.StateOptions = [];
    this.validatorForm.get('state')?.reset();
    this.resetDistricts();
  }

  resetDistricts() {
    this.DistrictOptions = [];
    this.validatorForm.get('district')?.reset();
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

  // resetVillage(): void {
  //   this.validatorForm.get('village')?.reset();
  // }



  navigateorganizationDetail(_id:string):void{
    this.router.navigate(["getbyorganization",_id])
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





}

