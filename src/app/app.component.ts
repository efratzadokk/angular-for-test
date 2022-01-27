import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Result } from './models/ElementsinJson.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService:DataService){}
  public ElementsDic!: Result ;
  

  ngOnInit():void{
    this.getDataFunc();
  }
  title = 'angular-for-test';


  getDataFunc(){
    this.dataService.getData().subscribe(
      data=>{
        if(data!=null){
          console.log(data["Time Series (Daily)"])//["2022-01-24"]
          this.ElementsDic=data;
          console.log("this.ElementsArr=",this.ElementsDic)
          console.log("x=",this.ElementsDic['Time Series (Daily)'])
        //  this.fillArr(data["Time Series (Daily)"])
        }else{
          alert("data=null")
        }
      },
      err=>{
        console.log('fail to get data from server.')
      }
    )

  }

  fillArr(dataToFillInArr:object){
    (Object.getOwnPropertyNames(dataToFillInArr));
    Object.keys(dataToFillInArr).forEach(key => {
      // console.log(key) // returns the keys in an object
      // console.log(dataToFillInArr[key]["1. open"])  // returns the appropriate value
      // var keyNames = Object.keys(myObject); 
   })
    // dataToFillInArr.array.forEach(element => {
    // let x:ElementsInSeries={
    //   element
    // };
    // this.ElementsArr.push(element)
// console.log(element)
    // });

  }
}
