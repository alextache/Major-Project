import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit, OnDestroy {

  results = [];
  // storing results coming from search service

  errorA:boolean = false;
  errorB:boolean = false;
  // checking if there are any errors in request

  finished:boolean = false;
  // checking if no more pictures in the results

  private searchResultSub: Subscription;
  // creating subscription

  constructor(public searchService: SearchService) { }
  // adding search.service.ts functions

  ngOnInit(): void {
    this.searchService.getResults();
    this.searchResultSub = this.searchService.getSearchResultsLisetener()
    .subscribe((results: string[]) => {

      if(results[0] === "e-t-1"){
        return this.errorA = true;
      }

      if(results[0] === "e-t-2"){
        return this.errorB = true;
      }

      this.errorA = false;
      this.errorB = false;
      // reseting errors

      this.results = [];
      for (let i = 0; i < results.length; i++) {
        this.results.push(results[i]);
      }

    });
  }

  ngOnDestroy(){
    this.searchResultSub.unsubscribe();
  }
  // prevent memory leaks

  loadPage(){
    this.searchService.loadNextPage();
  }
  // loading more content if available

  changeView(id:string){
    this.searchService.searchPicture(id);
    this.searchService.changeView();
  }



}



