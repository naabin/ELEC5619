import {Component, OnInit} from '@angular/core';
import {UserHttpService} from "./http/user.http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  ngOnInit(): void {
  }
}
