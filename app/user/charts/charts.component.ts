import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {Http, Headers} from "@angular/http";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {Router} from "@angular/router-deprecated";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'line-chart-demo',
    templateUrl: 'app/user/charts/lineChart.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartsComponent implements OnInit{
    private showTestsUrl = 'app/user/showTests';  
    role: string = 'user';
    lineChartData;
    testsData: any[];
     //lineChartLabels:Array<any> = ['20/04/2014', '20/04/2015', '20/04/2016'];
    lineChartLabels: any[];

    constructor(private route:ActivatedRoute,
                private router:Router,
                private http:Http) {
        this.lineChartData =[ {
            data: []
        }];
        this.lineChartLabels = new Array();
    }

    ngOnInit(){
        this.getTestsHistory();
    }
    
    getTestsHistory(){
        var that = this;
        this.http.get('/user/history')
            .toPromise()
            .then(response => that.initTestsHistory(response.json()))
            .catch(that.handleError);
        
    }

    initTestsHistory(response: any){
        this.testsData = response.tests;
        // date, testId, mark
        this.processTestData();

    }

    getTestInfo() {
        let that = this;
        var header = new Headers();
        header.append('Content-Type', "application/json");
        this.http
            .post(this.role + '/test_history',
                JSON.stringify({testId: that.testInfo.id}), {headers: header})
            .toPromise()
            .then(response => that.router.navigate(['/finishPage', that.role]))
            .catch();

        
    }

    processTestData(){
        console.log(this.testsData);
        console.log('aaa');

        for(let item of this.testsData){
            this.lineChartData[0].data.push(item.mark);
            this.lineChartLabels.push(this.parseDate(item.date));

        }
    }
    
    handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


    parseDate(date: string) : string{
        let buffer = new Date(date);
        return (buffer.getMonth() + '/' + buffer.getDay());

    }

    public lineChartOptions:any = {
        animation: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    public lineChartColours:Array<any> = [

        {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            tension: 0,
            fill: false,
        }
    ];

    public lineChartType:string = 'line';


    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }


}

