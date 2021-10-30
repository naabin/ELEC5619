import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../entities/Item';
import { User } from '../entities/User';
import { ItemService } from '../services/item-service/item.service';
import { UserService } from '../services/user-services/user-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  // icons
  faUser = faUser;

  // profile current user
  currentUser: User
  // mocked appliances
//   appliances = [{
//     title: 'Dyson Airwrap',
//     path: 'assets/img/profile/appliances1.jpeg'
//   },{
//     title: 'Matador BBQ',
//     path: 'assets/img/profile/appliances2.png'
//   }]

    items: Item[];

  // profile user form group
  userFg: FormGroup;

  constructor(private readonly _fb: FormBuilder, private userService: UserService, private itemService: ItemService) {
    this.userFg = this._fb.group({
      id: [],
      name: [this.currentUser?.name],
      username: [this.currentUser?.username],
      email: [this.currentUser?.email],
      phone: [this.currentUser?.phone],
      streetAddress: [this.currentUser?.address?.streetAddress],
      detailAddress: [`${this.currentUser?.address?.suburb}, ${this.currentUser?.address?.state}, ${this.currentUser?.address?.postcode}`],
      nameOnCard: [this.currentUser?.payment?.nameOnCard],
      cardNumber: [this.currentUser?.payment?.cardNumber],
      expiryDate: [this.currentUser?.payment?.expiryDate],
    });
  }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user') || '') as User;
    const userId = user.id;
    if (userId !== null) {
        this.userService.getUserById(userId).subscribe(user => {
            this.currentUser = user;
        })
    }
    this.itemService.getItemsByLenderId(userId).subscribe(items => {
        this.items = items;
    })
  }
}
