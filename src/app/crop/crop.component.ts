import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {

  localPicture:any = [];

  localPictureSearch: Subscription;

  canvasReset = false;

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {

    // subscription lisening to data coming for crop
    this.localPictureSearch = this.searchService.getLocalPicture()
    .subscribe((result: any) => {
      this.localPicture = [];
      this.localPicture.push(result);

      if(this.canvasReset === false){
        return this.canvasReset = true;
      }
      
    })
  }

  // changing view back to search
  changeView(){
    this.canvasReset = false;
    this.searchService.changeView();
  }

}
