import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerms: string = "";
  orientation: string = "landscape";

  activeViewSub: Subscription ;
  activeView: boolean = true;
  localActiveView: boolean = false;

  constructor(public searchService: SearchService) {}

  ngOnInit() {

    this.searchService.addSearch('minimal','landscape');
    
    this.activeViewSub = this.searchService.switchStatus()
    .subscribe((result: boolean) => {

      this.activeView = result;
      if(this.activeView === true){
        this.localActiveView = false;
      }

      if(this.activeView === false){
        this.localActiveView = true;
      }

    });
  };

  selectOrientation(value){
    this.orientation = value;
  }
  // function to select orientation selected by user

  onSearch(form: NgForm){
  // when form submitted run function

    if(form.invalid){
      return;
    }
    // check if form invalid

    this.searchTerms = form.value.search;
    // set user search input

    this.searchService.addSearch(this.searchTerms, this.orientation);
    // add search query to search.service.ts

  }



}
