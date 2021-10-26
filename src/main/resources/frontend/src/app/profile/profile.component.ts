import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../entities/User';
import { ItemService } from '../services/item-service/item.service';
import { UserService } from '../services/user-services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private itemService: ItemService) { }

  userFg = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    streetAddress: new FormControl(''),
    detailAddress: new FormControl(''),
    nameOnCard: new FormControl(''),
    cardNumber: new FormControl(''),
  });
  currentUser: User;
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.userService.getUserById(parseInt(userId)).subscribe(data => {
        this.currentUser = data;
      })

      this.itemService.getItemsByLenderId(parseInt(userId)).subscribe(data => {
        console.log(data);
      })
    }
  }

}
