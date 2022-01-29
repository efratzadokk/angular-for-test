import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data.service';
import { DaysData } from '../models/DaysData';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['./table-overview-example.component.css'],
  templateUrl: './table-overview-example.component.html',
})
export class TableOverviewExampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'open','high','low','close','hefresh' ];
  dataSource!: MatTableDataSource<DaysData>;
  ElementsDic: any ;
  keysArr:Array<string>=[];
  newArr:any;

  min:any=1000;
  max:any=0;
  indMin:any;
  indMax:any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dataService:DataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getDataFunc(); 
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
    let c:DaysData[]=Object.values(this.ElementsDic["Time Series (Daily)"])
    .map((dateDetails:any,index)=>{
      let date = new DaysData()
      date.date=this.keysArr[index];
      date.open=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["1. open"];
      date.high=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["2. high"];
      date.low=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["3. low"];
      date.close=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["4. close"];
      date.adjustedClose=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["5. adjusted close"];
      date.volume=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["6. volume"];
      date.dividendAmount=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["7. dividend amount"];
      date.splitCoefficient=this.ElementsDic["Time Series (Daily)"][this.keysArr[index]]["8. split coefficient"];
      return date
    })
    this.dataSource=new MatTableDataSource(c);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.newArr);
    this.cd.detectChanges();
    this.maxProfit()
  }

  hefresh(x:string,y:string):string{
    return (Number(x)-Number(y)).toFixed(2)
  }

  maxProfit(){
    var hef=0;
    for(var a=0;a<this.dataSource.filteredData.length;a++){
      for(var b=0; b<a;b++){
        if((Number(this.dataSource.filteredData[b].close)-Number(this.dataSource.filteredData[a].close))>hef){
              hef=Number(this.dataSource.filteredData[b].close)-Number(this.dataSource.filteredData[a].close);
              this.min=Number(this.dataSource.filteredData[a].close);
              this.max=Number(this.dataSource.filteredData[b].close);
              this.indMin=a
              this.indMax=b
        }
      }
    }
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
  }

}
