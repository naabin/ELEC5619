import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private readonly _router: Router) { }

  ngOnInit(): void {
  }

  navigateToDetail(productNum: number) {
    this._router.navigate(["/product-detail", productNum])
  }
}
