import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  contactLists: any[] = [];

  ngOnInit(): void {
    this.httpSvc.get<any>('https://reqres.in/api/users?page=1&per_page=10')
      .subscribe(
        res => {
          this.contactLists = res.data;
        }
      )
  }

  trackContacts(i: number, itemObj: any) {
    return itemObj.i;
  }

  onClickedShakeMe() {
    this.vibrationSvc.vibrate([ 1000, 1000, 1000, 2000, 3000, 5000 ]);
  }

  constructor(
    private vibrationSvc: Vibration,
    private httpSvc: HttpClient) {}

}
