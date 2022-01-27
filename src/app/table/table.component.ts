import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  Result } from '../models/ElementsinJson.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private dataService:DataService){}
  public _result: Result =new Result();
  public keysArr:Array<string>=[];
  public ElementsDic: any ;
  public newArr:any;
  public min:any=1000;
  public max:any=0;
  public indMin:any;
  public indMax:any;
  public maxHefresh:any;

  ngOnInit():void{
    this.getDataFunc();
  }
  title = 'angular-for-test';


  getDataFunc(){
    this.dataService.getData().subscribe(
      data=>{
        if(data!=null){
         this.ElementsDic=data;
         this.fillArr()
         this.maxProfit()
        }else{
          alert("data=null")
        }
      },
      err=>{
        console.log('fail to get data from server.')
      }
    )

  }

  fillArr(){
    this.keysArr=Object.keys(this.ElementsDic["Time Series (Daily)"])
    this.newArr=Object.values(this.ElementsDic["Time Series (Daily)"]).map((r:any)=>Object.values(r))
    console.log(this.newArr)
  }

  hefresh(x:string,y:string):string{
    return (Number(x)-Number(y)).toFixed(2)
  }

  maxProfit(){
    var hef=0;

    for(var a=0;a<this.newArr.length;a++){
      for(var b=0; b<a;b++){
        if(Number(this.newArr[b][3])-Number(this.newArr[a][3])>hef){
              hef=Number(this.newArr[b][3])-Number(this.newArr[a][3]);
              this.min=Number(this.newArr[a][3]);
              this.max=Number(this.newArr[b][3]);
              this.indMin=a
              this.indMax=b
        }
      }
    }

console.log([this.min,this.max,this.indMin,this.indMax])
  }

  maxProfitNoSorted(){
    var hef=0;

    for(var a=0;a<this.newArr.length;a++){
      for(var b=0; b<a;b++){
        if(Number(this.newArr[b][3])-Number(this.newArr[a][3])>hef){
          if(Number(this.newArr[a][3])<Number(this.newArr[b][3]))
            if(this.keysArr[a]<this.keysArr[b]){
              hef=Number(this.newArr[b][3])-Number(this.newArr[a][3]);
              this.min=Number(this.newArr[a][3]);
              this.max=Number(this.newArr[b][3]);
              this.indMin=a
              this.indMax=b
            }else{
              hef=Number(this.newArr[a][3])-Number(this.newArr[b][3]);
              this.min=Number(this.newArr[b][3]);
              this.max=Number(this.newArr[a][3]);
              this.indMin=b
              this.indMax=a
            }

        }
      }
    }

console.log([this.min,this.max,this.indMin,this.indMax])
  }

  searchByDate(){

  }
}
