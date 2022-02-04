import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cordova-entrypoint',
  template: `
    <router-outlet></router-outlet>
  `
})
export class EntrypointComponent implements OnInit {

  ngOnInit(): void {}

  constructor() {}
}
