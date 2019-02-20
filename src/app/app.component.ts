import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sfdcApp';
  constructor(private httpClient: HttpClient) { }
  httpdata;

  ngOnInit() {

    const username = 'fe808ed8d2aa4685baab44d0e3ab6ead';
    const password = '663020a42d374bbd9ec62fcbc88a71de';
    let authorization = "Basic " + btoa("fe808ed8d2aa4685baab44d0e3ab6ead:663020a42d374bbd9ec62fcbc88a71de");
    let samplejson = "{ 'id' : '1002'}";
    console.log("authorization -- " + authorization)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorization,
        'Accept': 'application/json',
        'x-Requested-With': 'XMLHttpRequest'
      })
    };

    this.httpClient.get("https://cors-anywhere.herokuapp.com/https://odata-us.heroku.com/odata/v4/a94c323f3ba340788e611ff9338da177/public$AssetHistoryBackup?$top=2000", httpOptions)
      .subscribe(res => {
        this.httpdata = res;
        console.log('REs- '+res);
        /* this.httpdata = JSON.stringify(data);
        let jsondata = JSON.parse(JSON.stringify(data))['value'];
        console.log('output' + JSON.stringify(data));
        this.httpdata = JSON.stringify(data);
        for (var i = 0; i < Object.keys(jsondata).length; i++) {
          console.log(jsondata[i]);
        } */

      },(err=>{
        console.log(err.error.message);
        
      })
      );
  }
  //  displaydata(data) {console.log('Repsonse -- '+data);this.httpdata = data;}

}
