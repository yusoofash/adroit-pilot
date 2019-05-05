import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResumeNamePipe } from '../user-page/company-predict/resume-name.pipe';
import { LoaderComponent, BlockUiComponent, PageNotFoundComponent, KeywordsTextboxComponent } from '../common';
import { AppRoutingModule } from '../app-routing.module';
import { Ng5SliderModule } from 'ng5-slider';
import { SimpleCardComponent } from '../common';
import { CompanyPageComponent } from '../user-page/company-page/company-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    Ng5SliderModule,
  ],
  declarations: [
    LoaderComponent,
    BlockUiComponent,
    PageNotFoundComponent,
    KeywordsTextboxComponent,
    ResumeNamePipe,
    SimpleCardComponent,
    CompanyPageComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    LoaderComponent,
    BlockUiComponent,
    PageNotFoundComponent,
    KeywordsTextboxComponent,
    BrowserAnimationsModule,
    ToastrModule,
    ResumeNamePipe,
    AppRoutingModule,
    SimpleCardComponent,
    CompanyPageComponent,
  ]
})
export class SharedModule { }
