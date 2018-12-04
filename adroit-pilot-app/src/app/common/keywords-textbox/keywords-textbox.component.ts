import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keywords-textbox',
  templateUrl: './keywords-textbox.component.html',
  styleUrls: ['./keywords-textbox.component.css']
})
export class KeywordsTextboxComponent implements OnInit {

  keyword: string;
  keywords = [];
  @Input()
  set inputKeywords(keywords) {
    this.keywords = keywords;
  }
  get inputKeywords() {
    return this.keywords;
  }
  @Output() outputKeywords = new EventEmitter<Array<string>>();

  constructor() { }

  ngOnInit() {
  }

  addKeyword(e) {
    const str = e.target.value;
    const currentLetter = str[str.length - 1];
    const keyword = str.slice(0, str.length - 1);
    if ((currentLetter === ',' || currentLetter === ' ') && keyword.length === 0) {
      this.keyword = null;
    } else if (this.keywords.includes(keyword)) {
      this.keyword = null;
    } else if ((currentLetter === ',' || e.keyCode === 13) && keyword.length > 0 ) {
      this.keywords.push(keyword);
      this.keyword = null;
    }

    this.outputKeywords.emit(this.keywords);
  }

  deleteKeyword(keyword) {
    const index = this.keywords.indexOf(keyword);
    this.keywords.splice(index, 1);
    this.outputKeywords.emit(this.keywords);
  }

}
