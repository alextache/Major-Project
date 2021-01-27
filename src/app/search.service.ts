import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// make service available to all aplication with only one instance
@Injectable({providedIn: 'root'})

export class SearchService {

  // created private var to store data
  private results = [];
  private error = [];
  private searchResults = new Subject();

  // temp storage for search queries used for pagination
  private searchTerms:string = '';
  private orientation:string = '';
  private page:number = 1;
  private totalPages:number ;

  // switching between crop and search mode
  private switch = new Subject();
  private switchValue: boolean = true;

  // passing image value to crop component
  private imgLink = new Subject();
  private tempImgLink = [];


  constructor(private http: HttpClient) {}

  getSearchResultsLisetener(){
    return this.searchResults.asObservable();
  }

  addSearch(searchTerms:string, orientation:string){
      // reseting page number on each search
      this.searchTerms = searchTerms;
      this.orientation = orientation;
      this.page = 1;

      this.http.get<{response: any}>(
      'https://angular-last.herokuapp.com/api/response?searchTerm='+searchTerms+'&orientation='+orientation+'&page='+this.page+'',
      )
      .subscribe((responseData: any )=> {

        if (responseData.error) {
          this.error = [];
          this.error.push("e-t-1");
          this.searchResults.next(this.error);
          return;
        }

        // check how many request left
        if (responseData.response.headers['x-ratelimit-remaining'] === '1'){
          this.error = [];
          this.error.push("e-t-2");
          this.searchResults.next(this.error);
          return;
        }

        // clear old data
        this.results = [];
        this.searchResults.next(this.results);

        this.totalPages = responseData.response.body.total_pages;
        this.results.push(responseData.response.body.results);
        this.searchResults.next(this.results);
      });
  }

  getResults(){
    return [...this.results];
    // spread operator
  }

  loadNextPage(){

    //
    if(this.page === this.totalPages){
      return console.log('no more content to load');
    }

    this.page = this.page + 1;

    this.http.get<{response}>(
      'https://angular-last.herokuapp.com/api/response?searchTerm='+this.searchTerms+'&orientation='+this.orientation+'&page='+this.page+'',
      )
      .subscribe((responseData)=> {

        if (responseData.response.headers['x-ratelimit-remaining'] === '1'){
          return console.log('you ran out of requests');
          // enter code to deal with that error
        }
        // check how many request left

        console.log('Request remaining this hour:')
        console.log(responseData.response.headers['x-ratelimit-remaining'])
        // temp code for testing


        for (let i = 0; i < 30; i++) {
          this.results[0].push(responseData.response.body.results[i]);
        }

        this.searchResults.next(this.results);
      });

  }

  // ------------------------

  // changes between crop and search mode on call
  changeView(){
    if(this.switchValue === true){
      this.switchValue = false;
      this.switch.next(this.switchValue);
      return;
    }

    if(this.switchValue === false){
      this.switchValue = true;
      this.switch.next(this.switchValue);
    }
  }

  // returns subscription for header to make changes accordingly
  switchStatus(){
    return this.switch.asObservable();
  }


  // ------------------------

  // sending subscription for the imgLink Subject
  getLocalPicture(){
    return this.imgLink.asObservable();
  }

  // searching for the information of the image targeted by the user
  searchPicture(id:string){
    for (let i = 0; i < this.results[0].length; i++) {
      if(this.results[0][i].id === id){
        this.tempImgLink = [];
        this.tempImgLink.push(this.results[0][i]);
        this.imgLink.next(this.tempImgLink);
      }
    }
  }


}
