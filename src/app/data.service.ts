import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Result} from './models/DaysData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient) { }

  // getData():Observable<ElementsInJson>{
  //   return this._http.get<ElementsInJson>("../assets/angular_Response.json");
  // }

  getData():Observable<Result>{
    var res=this._http.get<Result>("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo")
    
    return res;
  }
  
  
}
