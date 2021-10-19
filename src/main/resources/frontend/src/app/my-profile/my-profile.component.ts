import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../entities/User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  // icons
  faUser = faUser;

  // profile current user
  currentUser: User | null = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  // mocked appliances
  appliances = [{
    title: 'Dyson Airwrap',
    path: 'assets/img/profile/appliances1.jpeg'
  },{
    title: 'Matador BBQ',
    path: 'assets/img/profile/appliances2.png'
  }]

  // profile user form group
  userFg: FormGroup;

  constructor(private readonly _fb: FormBuilder) {
    console.log(this.currentUser);
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

  ngOnInit(): void {}
}
