import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  checkMembershipStatus(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }




  getCategories():Observable<any>{
    return this.httpClient.get(URL+"category")   
  }

  getsubCategories():Observable<any>{
    return this.httpClient.get(URL+"subcategory")   
  }

  getContinents():Observable<any>{
    return this.httpClient.get(URL+"continents")   
  }

  getCountries(_id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+"get-countriesBycontinent/"+_id);
  }

  getStates(_id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+"states_by_country/"+_id);
  }

  getDistricts(_id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+"districts_by_state/"+_id);
  }

  getOrganizations(categoryId: string, locationId: string,page: number = 1): Observable<any> {
    return this.httpClient.get(URL+"locationByOrganization",{
          params: {
            category_id: categoryId,
            // sub_category_id:subcategoryId,
            input_value: locationId,
            page: page.toString()
            
          }
        });
      }

      getorganizationsubCategories(_id:string):Observable<any>{
        return this.httpClient.get(URL+"category/"+_id+"/subcategories")   
      }



      getallorganaztions(page = 1): Observable<any> {
        let params = new HttpParams();
        params = params.set('page', page.toString()); // Convert page to string
        return this.httpClient.get(URL + "organizations", { params });
      }


      orginazationCategorydata(_id: string):Observable<any>{
        return this.httpClient.get(URL+'category/'+_id)
 
      }
      orginazationsubCategorydata(_id: string):Observable<any>{
        return this.httpClient.get(URL+'subcategory/'+_id)
 
      }




      addorganization(organization: any): Observable<any> {
        return this.httpClient.post(URL+"addOrgnization", organization);
      }



      // addorganization(organization: any, token: string): Observable<any> {
      //   const headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   });
      //   return this.httpClient.post(URL+"addOrgnization", organization, { headers });
      // }




      getOrganizationById(_id: string):Observable<any>{
        return this.httpClient.get(URL+'organizations/'+_id)
 
      }


}