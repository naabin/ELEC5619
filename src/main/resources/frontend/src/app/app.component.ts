import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  applicationName = 'DifficultShare';

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.applicationName = 'EasyShare';
    }, 3000);
  }
}
