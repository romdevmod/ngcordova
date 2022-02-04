import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  contactLists: any[] = [];

  trackContacts(i: number, itemObj: any) {
    return itemObj.i;
  }

  ngOnInit(): void {
    this.httpSvc.get<any>('https://reqres.in/api/users?page=1&per_page=10')
      .subscribe(
        res => {
          this.contactLists = res.data;
        }
      )
  }

  constructor(private httpSvc: HttpClient) {}

}
