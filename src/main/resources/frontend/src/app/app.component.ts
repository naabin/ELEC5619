import {Component, OnInit} from '@angular/core';
import {UserHttpService} from "./http/user.http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  applicationName = 'DifficultShare';

  constructor(private readonly _userHttpService: UserHttpService) {
      this._userHttpService.fetchUserById(2).subscribe((res) => {
          console.log(res);
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.applicationName = 'EasyShare';
    }, 3000);
  }
}
