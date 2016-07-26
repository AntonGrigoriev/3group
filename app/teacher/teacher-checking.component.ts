import {Component, OnDestroy, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {Http, Headers} from "@angular/http";

@Component({
    templateUrl: 'app/teacher/teacher-checking.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TeacherCheckingComponent implements OnInit, OnDestroy {

    public currentTest:any;
    private sub;

    constructor(private route:ActivatedRoute,
                private http:Http) {
    }

    ngOnInit() {
        var that = this;
        this.sub = this.route.params.subscribe(params => {
            that.currentTest = params['id'];
            console.log('that.currentTest ' + that.currentTest);
        });
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post('/teacher/check_test',
            JSON.stringify({testId: that.currentTest}), {headers: header})
            .toPromise()
            .then(response => console.log("kxjfhgjkxhjfgxk"))
            .catch();




    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

}
