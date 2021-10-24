import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  fullStar = 0;
  halfStar = 0;
  fullStarArr: number[] = [];

  selectedRateDay = false;
  selectedRateWeek = false;
  selectedRateMonth = false;

  targetDay: number;
  targetWeek: number;
  targetMonth: number;

  constructor(private readonly _activatedRoute: ActivatedRoute) {
  }

  productDetail: any;

  ngOnInit(): void {

  }

  calcStarNum(star: number): void {
      const totalHalfStar = star / 0.5;
      this.halfStar = totalHalfStar % 2;
      this.fullStar = star - this.halfStar * 0.5;
      for (let i = 0; i < this.fullStar; i++) {
          this.fullStarArr.push(1);
      }
  }

  payment() {
      if (this.total) {
          // this._toaster.success("Pay Successfully!");
      } else {
          // this._toaster.error("Please select your rent for!");
      }
  }

  get total(): number {
      let total = 0;
      if (this.selectedRateDay) {
          // total += this.targetDay * this.productDetail.ratePerDay ? this.targetDay * this.productDetail.ratePerDay : 0;
      }
      if (this.selectedRateWeek) {
          // total += this.targetWeek * this.productDetail.ratePerWeek ? this.targetWeek * this.productDetail.ratePerWeek : 0;
      }
      if (this.selectedRateMonth) {
          // total += this.targetMonth * this.productDetail.ratePerMonth ? this.targetMonth * this.productDetail.ratePerMonth : 0;
      }
      return total;
    }
}
