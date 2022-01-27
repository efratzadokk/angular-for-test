type ElementsInSeries= {    
    open:string;
    high:string;
    low:String;
    close:string;
    adjustedClose:string;
    volume:string;
    dividendAmount:string;
    splitCoefficient:string;
}


export class Result{
    "Meta Data":{
        "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed":string,
    "4. Output Size": string,
    "5. Time Zone": string
    };

  "Time Series (Daily)":any;
//   Map<string,ElementsInSeries>=new Map<string,ElementsInSeries>();
}
