import { Component, OnInit } from '@angular/core';
import { ValueService } from './services/value.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public items: Array<{ id: number, text: string }>;

  constructor(private valueService: ValueService) { }

  public ngOnInit() {
    this.valueService.getValues().subscribe(items => {
      this.items = items;
    });
  }

}
