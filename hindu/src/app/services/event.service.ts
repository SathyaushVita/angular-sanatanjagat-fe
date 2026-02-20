import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // constructor(private httpClient: HttpClient) { }
  constructor(private httpclient:HttpClient) { }





  // geteventCategories():Observable<any>{
  //   return this.httpclient.get(URL+"eventcategory")   
  // }


  // // getevents(categoryId: string,locationId: string): Observable<any> {
  // //   return this.httpClient.get(URL+"locationByEvents/",{
  // //         params: {
  // //           category: categoryId,
  // //           input_value: locationId,
            
  // //         }
  // //       });
  // //     }



  // getevents(categoryId: string, locationId: string, page: number = 1): Observable<any> {
  //   return this.httpClient.get(`${URL}locationByEvents`, {
  //     params: {
  //       category: categoryId,
  //       input_value: locationId,
  //       page: page.toString()
  //     }
  //   });
  // }

  //     getallevents():Observable<any>{
  //       return this.httpClient.get(URL+"events")
  //     }




  //     eventnCategorydata(id: string):Observable<any>{
  //       return this.httpClient.get(URL+'eventcategory/'+id)
  //     }



      geteventsById(_id: string):Observable<any>{
        return this.httpclient.get(URL+'event/'+_id)
 
      }

  //     addevent(event: any): Observable<any> {
  //       return this.httpClient.post(URL+"events", event);
  //     }

      eventsubCategories():Observable<any>{
        return this.httpclient.get(URL+"eventsubcategory")   
      }

      
      geteventById(_id: string):Observable<any>{
        return this.httpclient.get(URL+'eventsubcategory/'+_id)
 
      }






      


  GetallEvents():Observable<any>{
    return this.httpclient.get(URL+"event")
  }

  getEventCategory():Observable<any>{
    return this.httpclient.get(URL+"eventcategory")
  }

  getByEventCategory(id:string):Observable<any>{
    return this.httpclient.get(URL+"eventcategory/"+id)
  }


  getEvents(id:string):Observable<any>{
    return this.httpclient.get(URL+"event?category="+id)
  }

  getEventMain():Observable<any>{
    return this.httpclient.get(URL+"eventsmain")
  }

  getIndianEvents():Observable<any>{
    return this.httpclient.get(URL+'indiaevents')
  }

  getStatevent(id:string):Observable<any>{
    return this.httpclient.get(URL+"Events/state_id/"+id)
  }

  getDistrictevent(id:string):Observable<any>{
    return this.httpclient.get(URL+"Events/district_id/"+id)
  }

  getBlockevent(id:string):Observable<any>{
    return this.httpclient.get(URL+"Events/block_id/"+id)
  }

  getglobalevents():Observable<any>{
    return this.httpclient.get(URL+'globalevents')
  }

  getbycountryevents(_id:string):Observable<any>{
    return this.httpclient.get(URL+'event?object_id='+_id)
  }

  addevent(eventData: any): Observable<any> {
    return this.httpclient.post(URL+"event", eventData);
  }

  getbyevent(id:string):Observable<any>{
    return this.httpclient.get(URL+"event?_id="+id)
  }

  getNameByEventCategory(name:string):Observable<any> {
    return this.httpclient.get(URL+"eventcategory?name="+name)
  }

  filterEvents(categoryId: string, locationId: string, page: number = 1): Observable<any> {
    return this.httpclient.get(`${URL}locationByEvents`, {
      params: {
        category: categoryId,
        input_value: locationId,
        page: page.toString()
      }
    });
  }
}
