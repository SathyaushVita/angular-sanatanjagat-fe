import { Component } from '@angular/core';
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
import { EventService } from '../services/event.service';
import { Subscription, interval, Subject } from 'rxjs';
import { LocationService } from '../services/location.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzSelectModule,NzFormModule,NzTreeModule,NgxSpinnerModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {




//   categories: any[] = [];
//   continents: any[] = [];
//   countries: any[] = [];
//   states: any[] = [];
//   districts: any[] = [];
//   events: any[] = [];
//   pastOrganizations: any[] = [];

//   selectedContinent: string = '';
//   selectedCountry: string = '';
//   selectedState: string = '';
//   selectedDistrict: string = '';
//   countrydata: any;
//   districtdata:any;


//   CountryOptions: any[]=[];
//   StateOptions:any[]=[];
//   DistrictOptions:any[]=[];
//   ContinentOptions:any[]=[];
//   validatorForm!:FormGroup;
//   selectedLocationId: any;
//   selectedCategory:any;
//   currentPage: number = 1;

//   constructor(private organizationService: OrganizationsService,private route:ActivatedRoute, private fb:FormBuilder,   private router:Router,private eventservice:EventService) {}

//   // ngOnInit(): void {
//   //   this.selectedLocationId = this.route.snapshot.paramMap.get('id');
//   //   // this.loadCategories();
//   //   this.loadEvents();
//   //       this.loadLocations();
//   //       if (this.selectedCategory) {
//   //         this.applyFilters();

//   //       }


//   //   this.eventservice.geteventCategories().subscribe(
//   //     (categories: any[]) => {
//   //       this.nodes = this.createNodeTree(categories);
//   //       this.nodes.push({ key: '', title: 'All Events', value: '' });

//   //       this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//   //     },
//   //     (err: any) => console.error('Error loading categories:', err)
//   //   );
//   // }



//   // nzEvent(event: NzFormatEmitEvent): void {
//   //   const node = event.node!;

//   //   if (event.eventName === 'click' || event.eventName === 'expand') {
//   //     if (!node.isExpanded && node.children.length === 0 && !node.isLeaf) {
//   //       this.loadSubcategories(node);
//   //     }
//   //   }
//   // }

//   // loadSubcategories(node: NzTreeNode): void {
//   //   this.eventservice.eventsubCategories().subscribe(
//   //     (subcategories: any[]) => {
//   //       const children = subcategories.filter(sub => sub.category === node.key)
//   //         .map(sub => ({
//   //           title: sub.name,
//   //           key: sub._id,
//   //           isLeaf: true
//   //         }));

//   //       node.addChildren(children);
//   //       node.isExpanded = true;
//   //     },
//   //     (err: any) => console.error('Error loading subcategories:', err)
//   //   );
//   // }

//   // createNodeTree(data: any[]): NzTreeNodeOptions[] {
//   //   return data.map(item => ({
//   //     title: item.name,
//   //     key: item._id,
//   //     isLeaf: false
//   //   }));
//   // }



//   // onCategoryClick(event: NzFormatEmitEvent) {
//   //   this.selectedCategory = event.node?.origin?.key;
//   //   console.log(this.selectedCategory, "Selected Category ID");
//   //   this.router.navigate(["event", this.selectedCategory]);

//   //   if (this.selectedCategory ==='AllEvents') {
//   //     console.log(this.selectedCategory,"poiuy")
//   //     this.selectedCategory = '';
//   //   }
//   //   this.applyFilters();

//   // }
//   // onCategoryClick(event: NzFormatEmitEvent) {
//   //   this.selectedCategoryId = event.node?.origin?.key;
//   //   console.log(this.selectedCategoryId,"1111111111111")
//   //   this.router.navigate(["organizations", this.selectedCategoryId])
//   //   if (this.selectedCategoryId ==='AllTemples') {
//   //     console.log(this.selectedCategoryId,"poiuy")
//   //     this.selectedCategoryId = '';
//   //   }

//   //   this.applyFilters();

//   // }
//   ngOnInit(): void {
//     this.selectedLocationId = this.route.snapshot.paramMap.get('id');
//     // this.loadCategories();
//     this.loadEvents();
//     this.loadLocations();

//     if (this.selectedCategory) {
//       this.applyFilters();
//     }

//     this.eventservice.geteventCategories().subscribe(
//       (categories: any[]) => {
//         this.nodes = this.createNodeTree(categories);
//         this.nodes.push({ key: '', title: 'All Events', value: '' });

//         this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//       },
//       (err: any) => console.error('Error loading categories:', err)
//     );
//   }

//   onCategoryClick(event: NzFormatEmitEvent) {
//     const node = event.node!;
//     this.selectedCategory = node.origin.key;
//     console.log(this.selectedCategory, "Selected Category ID");

//     this.router.navigate(["event", this.selectedCategory]);

//     if (this.selectedCategory === 'AllEvents') {
//       console.log(this.selectedCategory, "poiuy");
//       this.selectedCategory = '';
//     }

//     // Load subcategories on click
//     if (!node.isExpanded && node.children.length === 0 && !node.isLeaf) {
//       this.loadSubcategories(node);
//     } else {
//       node.isExpanded = !node.isExpanded; // Toggle node expansion
//     }

//     this.applyFilters();
//   }

//   loadSubcategories(node: NzTreeNode): void {
//     this.eventservice.eventsubCategories().subscribe(
//       (subcategories: any[]) => {
//         const children = subcategories.filter(sub => sub.category === node.key)
//           .map(sub => ({
//             title: sub.name,
//             key: sub._id,
//             isLeaf: true
//           }));

//         node.addChildren(children);
//         node.isExpanded = true; // Automatically expand after loading children
//       },
//       (err: any) => console.error('Error loading subcategories:', err)
//     );
//   }

//   createNodeTree(data: any[]): NzTreeNodeOptions[] {
//     return data.map(item => ({
//       title: item.name,
//       key: item._id,
//       isLeaf: false
//     }));
//   }


//   cleardata(){
//     this.selectedLocationId = []
//     this.applyFilters();
//   }

//   onReset(): void {
//     this.validatorForm.reset();
//     this.selectedLocationId = null;
//     this.applyFilters();
//     // this.loadEvents();
//   }

//   applyFilters() {
//     this.currentPage = 1;
//     this.events = [];
//     this.loadEvents();
//   }



//   toggleFilters() {
//     this.filtersVisible = !this.filtersVisible;
//   }

//   filtersVisible: boolean = true;

//   // nzEvent(event: NzFormatEmitEvent): void {
//   //   const node = event.node!;

//   //   if (event.eventName === 'click' || event.eventName === 'expand') {
//   //     if (!node.isExpanded && node.children.length === 0 && !node.isLeaf) {
//   //       // this.loadSubcategories(node);
//   //     }
//   //   }
//   // }












// eventdata: any[] = [];
// UpComingeventdata: any[] = [];
// Completedeventdata: any[] = [];
// eventcategorydata: any;

// loadEvents() {
//   if (this.selectedCategory && this.selectedLocationId) {
//     this.eventservice.getevents(this.selectedCategory, this.selectedLocationId, this.currentPage).subscribe(
//       (response) => {
//         this.UpComingeventdata = response.event_upcoming;
//         this.Completedeventdata = response.event_completed;
//         console.log(this.UpComingeventdata, "Upcoming Events with Category and Location");
//         console.log(this.Completedeventdata, "Completed Events with Category and Location");
//       },
//       (error) => {
//         console.error('Error fetching events with category and location:', error);
//       }
//     );
//   } else if (this.selectedCategory) {
//     this.eventservice.getevents(this.selectedCategory, '', this.currentPage).subscribe(
//       (response) => {
//         this.UpComingeventdata = response.event_upcoming;
//         this.Completedeventdata = response.event_completed;
//         console.log(this.UpComingeventdata, "Upcoming Events with Category");
//         console.log(this.Completedeventdata, "Completed Events with Category");
//       },
//       (error) => {
//         console.error('Error fetching events with category:', error);
//       }
//     );
//   } else if (this.selectedLocationId) {
//     this.eventservice.getevents('', this.selectedLocationId, this.currentPage).subscribe(
//       (response) => {
//         this.UpComingeventdata = response.event_upcoming;
//         this.Completedeventdata = response.event_completed;
//         console.log(this.UpComingeventdata, "Upcoming Events with Location");
//         console.log(this.Completedeventdata, "Completed Events with Location");
//         this.eventcategorydata = null;
//       },
//       (error) => {
//         console.error('Error fetching events with location:', error);
//       }
//     );
//   } else {
//     this.eventservice.getallevents().subscribe(
//       (response) => {
//         this.UpComingeventdata = response.event_upcoming;
//         this.Completedeventdata = response.event_completed;
//         console.log(this.UpComingeventdata, "All Upcoming Events");
//         console.log(this.Completedeventdata, "All Completed Events");
//         this.eventcategorydata = null;
//       },
//       (error) => {
//         console.error('Error fetching all events:', error);
//       }
//     );
//   }

//   // Fetch event category data for the selected category
//   this.eventservice.eventnCategorydata(this.selectedCategory).subscribe(
//     data => {
//       this.eventcategorydata = data;
//       console.log(this.eventcategorydata, "Event Category Data");
//     },
//     error => {
//       console.error('Error fetching event category data:', error);
//     }
//   );
//   this.eventservice.geteventById(this.selectedCategory).subscribe(
//     data => {
//       this.eventcategorydata = data;
//     },

//   );
// }


// loadMore() {
//   this.currentPage++;
//   this.loadEvents();
// }



// orginazationCategorydata:any





//   loadLocations(): void {
//     this.validatorForm = this.fb.group({
//       continent: ['', [Validators.required]],
//       country: ['', [Validators.required]],
//       state: ['', [Validators.required]],
//       district: ['', Validators.required],
//       mandal: ['', Validators.required],
//       village: ['', Validators.required]
//     });

//     this.organizationService.getContinents().subscribe(
//       (res) => {
//         if (res  && Array.isArray(res)) {
//           this.ContinentOptions = res.map((continent: any) => ({
//             label: continent.name,
//             value: continent._id
//           }))
//           .sort((a, b) => a.label.localeCompare(b.label));
//           this.applyFilters()

//         } else {
//           console.error("Response is not in expected format", res);
//         }
//       },
//       (err) => {
//         console.error(err);
//       }
//     );



//     this.validatorForm.get('continent')?.valueChanges.subscribe((continentID) => {
//       console.log(continentID, "wdefrgh");
//       if (continentID) {
//         this.selectedLocationId = continentID;
//         this.applyFilters()
//         console.log(continentID, "zaxsdfg");
//         this.organizationService.getCountries(continentID).subscribe(
//           data => {
//             this.countrydata = data;

//             console.log(this.countrydata, "this.countrydata");

//             if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.countries && Array.isArray(this.countrydata.countries)) {
//               this.CountryOptions = this.countrydata.countries.map((country: any) => ({
//                 label: country.name,
//                 value: country._id
//               })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
//               console.log(this.CountryOptions, "2345678");
//             } else {
//               console.error("Response is not in expected format", this.countrydata);
//             }
//           },
//           (err) => {
//             console.error(err);
//           }
//         );
//         this.resetStates();
//       }
//     });


//     this.validatorForm.get('country')?.valueChanges.subscribe((countryID) => {
//       if (countryID) {
//         this.selectedLocationId = countryID;
//         this.applyFilters()
//         this.organizationService.getStates(countryID).subscribe(
//           (data) => {
//             this.countrydata = data;

//             console.log(this.countrydata, "this.countrydata");

//             if (this.countrydata && typeof this.countrydata === 'object' && this.countrydata.states && Array.isArray(this.countrydata.states)) {
//               this.StateOptions = this.countrydata.states.map((state: any) => ({
//                 label: state.name,
//                 value: state._id
//               })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
//               console.log(this.StateOptions, "State Options");
//             } else {
//               console.error("Response is not in expected format", this.countrydata);
//             }
//           },
//           (err) => {
//             console.error(err);
//           }
//         );
//         this.resetStates();
//       }
//     });


//     this.validatorForm.get('state')?.valueChanges.subscribe((stateID) => {
//       if (stateID) {
//         this.selectedLocationId = stateID;
//         this.applyFilters()
//         this.organizationService.getDistricts(stateID).subscribe(
//           (data) => {
//             this.districtdata = data;

//             console.log(this.districtdata, "this.districtdata");

//             if (this.districtdata && typeof this.districtdata === 'object' && this.districtdata.districts && Array.isArray(this.districtdata.districts)) {
//               this.DistrictOptions = this.districtdata.districts.map((district: any) => ({
//                 label: district.name,
//                 value: district._id
//               })).sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label));
//               console.log(this.DistrictOptions, "District Options");
//             } else {
//               console.error("Response is not in expected format", this.districtdata);
//             }
//           },
//           (err) => {
//             console.error(err);
//           }
//         );
//       } else {
//         this.resetDistricts();
//       }
//     });

//     this.validatorForm.get('district')?.valueChanges.subscribe(districtID => {
//       if (districtID) {
//         this.selectedLocationId = districtID;
//         this.applyFilters()
//         console.log('district ID selected:', this.selectedLocationId);
//       } else {
//         this.resetDistricts();
//       }
//     });

//   }

//   resetStates() {
//     this.StateOptions = [];
//     this.validatorForm.get('state')?.reset();
//     this.resetDistricts();
//   }

//   resetDistricts() {
//     this.DistrictOptions = [];
//     this.validatorForm.get('district')?.reset();
//   }



//   activeTab: string = 'upcoming';

//   updateTab(tab: string) {
//     this.activeTab = tab;
//   }



//   navigateorganizationDetail(_id:string):void{
//     this.router.navigate(["getbyevents",_id])
//   }



// }


nodes: NzTreeNodeOptions[] = [];
searchValue: string = '';

validatorForm!:FormGroup;
categoryId: any;
eventdata: any;
picdata: any;
eventcategorydata: any;
selected = false;
locationId = '';
location : any;
selectedCategoryId:any;
selectedLocationId: any;
currentPage: number = 1;
subscription: Subscription = new Subscription();
destroy$: Subject<void> = new Subject<void>();
StateOptions:any[]=[];
DistrictOptions:any[]=[];
MandalOptions:any[]=[];
VillageOptions:any[]=[];
CountryOptions: any;
activeTab: string = 'upcoming';
filtersVisible: boolean = true;
UpComingeventdata: any;
Completedeventdata: any;




constructor(
  private route: ActivatedRoute,
   private eventservice: EventService,
    private router:Router,
    private fb:FormBuilder,

    private locationservice:LocationService,
    private authenticationService:AuthenticationService,
    private userservice:UserService,
    private spinner: NgxSpinnerService
  ) { }

ngOnInit(): void {

  this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
  if (this.selectedCategoryId ==='AllEvents') {
    console.log(this.selectedCategoryId,"poiuy")
    this.selectedCategoryId = '';
    this.applyFilters();
  }


  // this.route.paramMap.subscribe(params => {
  //   this.selectedCategoryId = params.get('id');
  //   this.selectedCategoryId = '';
  //   this.applyFilters();
  // });


  this.loadlocations()

  if (this.selectedCategoryId) {
    this.applyFilters();

  }
      this.eventservice.getEventCategory().subscribe(
      (categories: any[]) => {
        this.nodes = this.createNodeTree(categories);
        this.nodes.push({ key: '', title: 'All Events', value: '' });

        this.nodes.sort((a, b) => a.title.localeCompare(b.title));
      },
      (err: any) => console.error('Error loading categories:', err)
    );
}

  createNodeTree(data: any[]): NzTreeNodeOptions[] {
    return data.map(item => ({
      title: item.name,
      key: item._id,
      isLeaf: false
    }));
  }


updateTab(tab: string) {
  this.activeTab = tab;
}





navigateEventdata(event:string):void{
  this.router.navigate(['getbyevents',event])
}


onCategoryClick(event: NzFormatEmitEvent) {
  this.selectedCategoryId = event.node?.origin?.key;
  console.log(this.selectedCategoryId,"1111111111111")
  this.router.navigate(["events", this.selectedCategoryId])
  if (this.selectedCategoryId ==='AllEvents') {
    console.log(this.selectedCategoryId,"poiuy")
    this.selectedCategoryId = '';
  }


  this.applyFilters();

}



onReset(): void {
  this.validatorForm.reset();
  this.selectedLocationId = null;
  this.applyFilters();
    this.StateOptions = [];
    this.DistrictOptions = [];
    this.MandalOptions =[];
    this.VillageOptions =[];

}

handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/noImageDataImage.jpg';
}


applyFilters() {
  this.currentPage = 1;
  this.eventdata = [];
  this.loadFilteredTemples();
}

loadFilteredTemples() {
  this.spinner.show();
  if (this.selectedCategoryId && this.selectedLocationId) {
    this.eventservice.filterEvents(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
      (response) => {
        this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
        this.Completedeventdata = [...this.eventdata, ...response.event_completed];
        console.log(this.UpComingeventdata, "33333333333333333333");
        console.log(this.Completedeventdata, "33333333333333333333");
        this.spinner.hide();


      },
      (error) => {
        console.error('Error fetching filtered temples:', error);
        this.spinner.hide();

      }
    );
  } else if (this.selectedCategoryId){
    this.eventservice.filterEvents(this.selectedCategoryId, '', this.currentPage).subscribe(
      (response) => {
        this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
        this.Completedeventdata = [...this.eventdata, ...response.event_completed];
        console.log(this.UpComingeventdata, "33333333333333333333");
        console.log(this.Completedeventdata, "33333333333333333333");
        this.spinner.hide();


      },
      (error) => {
        console.error('Error fetching filtered temples:', error);
        this.spinner.hide();

      }
    );
  } else if (this.selectedLocationId){
    this.eventservice.filterEvents('',this.selectedLocationId, this.currentPage).subscribe(
      (response) => {
        this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
        this.Completedeventdata = [...this.eventdata, ...response.event_completed];
        console.log(this.UpComingeventdata, "33333333333333333333");
        console.log(this.Completedeventdata, "33333333333333333333");
        this.eventcategorydata=null
        this.spinner.hide();


      },
      (error) => {
        console.error('Error fetching filtered temples:', error);
        this.spinner.hide();

      }
    );
  }

  else {
    this.eventservice.GetallEvents().subscribe(
        (response) => {

            this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
            this.Completedeventdata = [...this.eventdata, ...response.event_completed];
            console.log(this.UpComingeventdata, "33333333333333333333");
            console.log(this.Completedeventdata, "33333333333333333333");
            console.log(this.eventdata, "Filtered Temples without Category or Location");
            this.eventcategorydata=null
            this.spinner.hide();

        },
        (error) => {
            console.error('Error fetching filtered temples:', error);
            this.spinner.hide();

        }
    );
}
this.eventservice.getByEventCategory(this.selectedCategoryId).subscribe(data => {
  this.eventcategorydata = data;
  console.log(this.eventcategorydata, "/////////////////////////");
  this.spinner.hide();

});




}

loadMore() {
  this.currentPage++;
  this.loadFilteredTemples();
}

loadlocations(): void {
  this.validatorForm = this.fb.group({
    country:['',[Validators.required]],
    state: ['', [Validators.required]],
    district: ['', Validators.required],
    mandal: ['', Validators.required],
    village: ['', Validators.required]
  });




  // this.locationservice.GetAllCountries().subscribe(
  //   (res) => {
  //     if (Array.isArray(res)) {
  //       this.CountryOptions = res.map((country: any) => ({
  //         label: country.name,
  //         value: country._id
  //       }));

  //       this.CountryOptions.sort((a: { label: string; value: any }, b: { label: string; value: any }) =>
  //         a.label.localeCompare(b.label)
  //       );



  //     } else {
  //       console.error("Response is not an array type", res);
  //       this.CountryFormControls();
  //     }
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );




this.locationservice.GetAllCountries().subscribe(
  (res: any) => {
    if (res && Array.isArray(res.data)) {
      this.CountryOptions = res.data.map((country: any) => ({
        label: country.name,
        value: country._id
      })) .sort((a: { label: string; value: any }, b: { label: string; value: any }) =>
        a.label.localeCompare(b.label)
      );
    } else {
      console.error("Response data is not an array type:", res);
    }
  },
  (err) => {
    console.error("Error fetching countries:", err);
  }
);






this.validatorForm.get('country')?.valueChanges.subscribe(CountryID => {
  if (CountryID) {
    this.selectedLocationId = CountryID;
    this.applyFilters();
    this.resetFormControls();
    this.StateOptions = [];
    this.DistrictOptions = [];
    this.MandalOptions = [];
    this.VillageOptions = [];

    console.log('Country ID selected:', this.selectedLocationId);

    this.locationservice.getbyStates(CountryID).subscribe(
      (res: any) => {
        if (res && Array.isArray(res.results)) {
          this.StateOptions = res.results.map((state: any) => ({
            label: state.name,
            value: state._id
          }));
          this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));
          this.resetFormControls();
        } else {
          console.error("Response 'results' is not an array type:", res);
          this.resetFormControls();
        }
      },
      (err) => {
        console.error("Error fetching states:", err);
      }
    );
  }
});




  // Initialize form control states
  this.resetFormControls();

  // Initialize form control states
  this.resetFormControls();

  // Handle state changes
  this.validatorForm.get('state')?.valueChanges.subscribe(stateID => {
    if (stateID) {
      this.selectedLocationId = stateID; // Store state ID
      console.log('State ID selected:', this.selectedLocationId);
      this.applyFilters()

      this.locationservice.getdistricts(stateID).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.DistrictOptions = res.map((district: any) => ({
              label: district.name,
              value: district._id
            }));
            this.DistrictOptions.sort((a, b) => a.label.localeCompare(b.label));
          } else {
            console.error("Response is not an array type", res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.resetDistrictMandalVillage();
      this.validatorForm.get('district')?.enable();
    } else {
      this.resetDistrictMandalVillage();
    }
  });

  // Handle district changes
  this.validatorForm.get('district')?.valueChanges.subscribe(districtID => {
    if (districtID) {
      this.selectedLocationId = districtID; // Replace state ID with district ID
      console.log('District ID selected:', this.selectedLocationId);
      this.applyFilters()
      this.locationservice.getblocks(districtID).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.MandalOptions = res.map((mandal: any) => ({
              label: mandal.name,
              value: mandal._id
            }));
            this.MandalOptions.sort((a, b) => a.label.localeCompare(b.label));
          } else {
            console.error("Response is not an array type", res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.resetMandalVillage();
      this.validatorForm.get('mandal')?.enable();
    } else {
      this.resetMandalVillage();
    }
  });

  // Handle mandal changes
  this.validatorForm.get('mandal')?.valueChanges.subscribe(mandalID => {
    if (mandalID) {
      this.selectedLocationId = mandalID; // Replace district ID with mandal ID
      console.log('Mandal ID selected:', this.selectedLocationId);
      this.applyFilters()
      this.locationservice.getvillages(mandalID).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.VillageOptions = res.map((village: any) => ({
              label: village.name,
              value: village._id
            }));
            this.VillageOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.resetVillage();
          } else {
            console.error("Response is not an array type", res);
            this.resetVillage();
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.validatorForm.get('village')?.enable();
    } else {
      this.resetVillage();
    }
  });

  this.validatorForm.get('village')?.valueChanges.subscribe(villageID => {
    if (villageID) {
      this.selectedLocationId = villageID; // Replace mandal ID with village ID
      this.applyFilters()
      console.log('Village ID selected:', this.selectedLocationId);
    } else {
      this.resetVillage();
    }
  });
}


CountryFormControls(): void {
  this.validatorForm.get('country')?.reset();
  this.validatorForm.get('state')?.reset();
  this.validatorForm.get('district')?.reset();
  this.validatorForm.get('mandal')?.reset();
  this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('district')?.disable();
  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

// Helper methods for resetting and disabling form controls
resetFormControls(): void {
  this.validatorForm.get('state')?.reset();
  this.validatorForm.get('district')?.reset();
  this.validatorForm.get('mandal')?.reset();
  this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('district')?.disable();
  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

resetDistrictMandalVillage(): void {
  this.validatorForm.get('district')?.reset();
  this.validatorForm.get('mandal')?.reset();
  this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('mandal')?.disable();
  // this.validatorForm.get('village')?.disable();
}

resetMandalVillage(): void {
  this.validatorForm.get('mandal')?.reset();
  this.validatorForm.get('village')?.reset();

  // this.validatorForm.get('village')?.disable();
}

resetVillage(): void {
  this.validatorForm.get('village')?.reset();
}


ngOnDestroy(): void {
  this.subscription.unsubscribe();
  this.destroy$.next();
  this.destroy$.complete();
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




shareGoshala(temple: any) {
  if (!temple || !temple._id) {
    console.error('Invalid temple data provided.');
    return;
  }

  const shareUrl = `${window.location.origin}/events/${temple._id}`;
  console.log('Share URL:', shareUrl);

  if (navigator.share) {
    navigator.share({
      title: temple.name,
      text: temple.desc || 'Check out this temple!',
      url: shareUrl
    }).then(() => {
      console.log('Sharing successful');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    alert(`Share URL: ${shareUrl}`);
  }
}






}

