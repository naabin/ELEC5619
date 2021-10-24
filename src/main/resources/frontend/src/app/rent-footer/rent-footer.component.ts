import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-rent-footer',
  templateUrl: './rent-footer.component.html',
  styleUrls: ['./rent-footer.component.css']
})
export class RentFooterComponent implements OnInit, OnChanges {

  @Input() name: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes')
  }

  ngOnInit(): void {
    console.log('Init')
  }


}
