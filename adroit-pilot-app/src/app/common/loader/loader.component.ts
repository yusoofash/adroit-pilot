import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loader = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService._loader$.subscribe(res => this.loader = res);
  }

  ngOnInit() {
  }

}
