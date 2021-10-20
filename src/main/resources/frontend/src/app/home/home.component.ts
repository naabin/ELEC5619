import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from '../entities/Item';
import { ItemService } from '../services/item-service/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  searchForm = new FormGroup({
    search: new FormControl('')
  });
  searchedItems: Item[];
  searching = false;

  searchItems(searchQuery: string) {
    const subject = new BehaviorSubject<string>(searchQuery);
    subject.pipe(
      switchMap((searchValue) => {
        this.searching = true;
        return this.itemService.getAllBySearchQuery(searchValue);
      })
    ).subscribe((data) => {
      console.log(data);
      this.searchedItems = data;
    })
  }
}
