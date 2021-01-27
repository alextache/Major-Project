import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import Cropper from "cropperjs";

@Component({
  selector: 'app-crop-backend',
  templateUrl: './crop-backend.component.html',
  styleUrls: ['./crop-backend.component.css']
})
export class CropBackendComponent implements OnInit {

  pictureName:string = "Picture";

  // var required by cropperjs
  @ViewChild("image", { static: false })
    public imageElement: ElementRef;

    @Input("src")
    public imageSource: string;

    public imageDestination: string;
    private cropper: Cropper;

    public constructor() {
        this.imageDestination = "";
  }

  // initializing crop component after image loaded
  public ngAfterViewInit() {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
          zoomable: false,
          scalable: false,
          aspectRatio: 0,
          crop: () => {
              const canvas = this.cropper.getCroppedCanvas();
              this.imageDestination = canvas.toDataURL("image/png");
          }
      });
  }

  ngOnInit(): void {}

  updateFileName(event:any){
    this.pictureName = event.target.value; 
  }

}
