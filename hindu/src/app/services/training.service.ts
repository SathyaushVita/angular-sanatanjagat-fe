import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private httpClient: HttpClient) { }





  // getTrainingCategories():Observable<any>{
  //   return this.httpClient.get(URL+"trainingcategory")   
    
  // }


  // getTrainings(categoryId: string,locationId: string): Observable<any> {
  //   return this.httpClient.get(URL+"locationByTraining",{
  //         params: {
  //           category: categoryId,
  //           input_value: locationId,
            
  //         }
  //       });
  //     }



  //     getalltrainings():Observable<any>{
  //       return this.httpClient.get(URL+"training")
  //     }



  //     trainingCategorydata(_id: string):Observable<any>{
  //       return this.httpClient.get(URL+'trainingcategory/'+_id)
 
  //     }

  //     getTrainingById(_id: string):Observable<any>{
  //       return this.httpClient.get(URL+'training/'+_id)
 
  //     }

  //     addtraining(training: any): Observable<any> {
  //       return this.httpClient.post(URL+"training", training);
  //     }


      
      gettrainingsubCategories1():Observable<any>{
        return this.httpClient.get(URL+"trainingsubcategory")   
      }


  //     traininggetById(_id: string):Observable<any>{
  //       return this.httpClient.get(URL+'trainingsubcategory/'+_id)
  //     }



  
  getTrainingCategories():Observable<any>{
    return this.httpClient.get(URL+"trainingcategory")   
    
  }


  getTrainings(categoryId: string,locationId: string): Observable<any> {
    return this.httpClient.get(URL+"locationByTraining",{
          params: {
            category: categoryId,
            input_value: locationId,
            
          }
        });
      }



      getalltrainings():Observable<any>{
        return this.httpClient.get(URL+"training")
      }



      trainingCategorydata(_id: string):Observable<any>{
        return this.httpClient.get(URL+'trainingcategory/'+_id)     
 
      }

      getTrainingById(_id: string):Observable<any>{
        return this.httpClient.get(URL+'training/'+_id)
 
      }

      addtraining(training: any): Observable<any> {
        return this.httpClient.post(URL+"training", training);
      }


      
      gettrainingsubCategoriesadd():Observable<any>{
        return this.httpClient.get(URL+"trainingsubcategor")   
      }

      
      gettrainingsubCategories(_id:string):Observable<any>{
        return this.httpClient.get(URL+"trainingcategory/"+_id+"/subcategories")   
      }






      
      traininggetById(_id: string):Observable<any>{
        return this.httpClient.get(URL+'trainingsubcategory/'+_id)
 
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
}
