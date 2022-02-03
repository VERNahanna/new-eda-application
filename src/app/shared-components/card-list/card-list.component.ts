import {Component, Input, OnInit} from '@angular/core';
import {CardsList} from "../../../utils/common-models";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() data: CardsList[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
