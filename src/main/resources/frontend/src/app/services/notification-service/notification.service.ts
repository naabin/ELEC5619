import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'clear',
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationInput: Subject<Notification>;
  notificationOutput: Observable<Notification[]>;

  constructor() {
    this.notificationInput = new Subject();
    this.notificationOutput = this.notificationInput.pipe(
      scan((messages: Notification[], notification: Notification) => {
        if (notification.type === 'clear') {
          return messages.filter(message => message.id !== notification.id);
        } else {
          return [...messages, notification];
        }
      }, [])
    )
  }

  addSuccess(message: string){
    const id = this.randomId();
    this.notificationInput.next(
      {
        id: id,
        type: "success",
        text: message
      }
    )

    setTimeout(() => {this.clear(id)},5000)

  }

  addError(message: string){
    const id =  this.randomId();
    this.notificationInput.next(
      {
        id: id,
        type: "error",
        text: message
      }
    )
    setTimeout(() => {this.clear(id)},5000)
  }

  clear(id: number){
    this.notificationInput.next({id, type:"clear"});
  }

  private randomId(){
    return Math.round(Math.random() * 100000);
  }
}
