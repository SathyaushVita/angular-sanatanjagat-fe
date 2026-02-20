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
  selector: 'app-global-organizations',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzSelectModule,NzFormModule,NzTreeModule,NgxSpinnerModule],
  templateUrl: './global-organizations.component.html',
  styleUrl: './global-organizations.component.css'
})
export class GlobalOrganizationsComponent {



  
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
    Categories:any;
  
  
    constructor(private organizationService: OrganizationsService,private route:ActivatedRoute, private fb:FormBuilder,   private router:Router,private spinner: NgxSpinnerService,
      private userservice:UserService,private authenticationService:AuthenticationService
    ) {}
  

  
  
    ngOnInit(): void {
      this.selectedCategoryId = this.route.snapshot.paramMap.get('id');

      if (this.selectedCategoryId ==='Allorganizations') {
        console.log(this.selectedCategoryId,"poiuy")
        this.selectedCategoryId = '';
      }
      this.getAllCategories();
 
    }
  
    onCategoryClick(event: NzFormatEmitEvent) {
      const node = event.node!;
      this.selectedCategoryId = node.origin.key;
  
      console.log(this.selectedCategoryId, "1111111111111");
      this.router.navigate(["subglobalorganizations", this.selectedCategoryId]);
  
      if (this.selectedCategoryId === 'AllTemples') {
        console.log(this.selectedCategoryId, "poiuy");
        this.selectedCategoryId = '';
      }
  

    }


    getAllCategories() {
      this.spinner.show();
      this.organizationService.getCategories().subscribe(
        (categories: any[]) => {
          this.Categories = categories.sort((a, b) => {
            if (a.name.toLowerCase() === 'others') return 1; 
            if (b.name.toLowerCase() === 'others') return -1; 
            return a.name.localeCompare(b.name); 
          });
          this.spinner.hide(); 
        },
        (err: any) => {
          console.error('Error loading all subcategories:', err); 
          this.spinner.hide(); 
        }
      );
    }
    
    // createNodeTree(data: any[]): NzTreeNodeOptions[] {
    //   return data.map(item => ({
    //     title: item.name,
    //     key: item._id,
    //     // isLeaf: false
    //   }));
    // }
  
    handleImageError(event: Event) {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = 'assets/images/noImageDataImage.jpg';
    }
  
    navigateorganizationDetail(_id:string):void{
      this.router.navigate(["subglobalorganizations",_id])
    }
  
  
  
  

  
  
  
  
  
  
  

}
