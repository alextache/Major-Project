import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";

// material imports
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { CropComponent } from './crop/crop.component';
import { CropBackendComponent } from './crop/crop-backend/crop-backend.component';

const appRoutes: Routes = [
  { path: '', component: ResultsComponent },
  { path: 'crop/:id', component: CropComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    CropComponent,
    CropBackendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
