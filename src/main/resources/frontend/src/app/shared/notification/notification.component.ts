import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification, NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications$: Observable<Notification[]>

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notificationOutput;
  }

  ngOnInit() {
  }

  clearMessge(id: number){
    this.notificationService.clear(id);
  }

}
