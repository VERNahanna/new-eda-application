import {Component, Input, OnInit} from '@angular/core';
import {CardsList} from "../../../utils/common-models";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {InputService} from "../../services/input.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() itemData: CardsList;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  showCardDetails: boolean;

  constructor(public translateService: TranslateService,
              private inputService: InputService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  showDetails() {
    this.showCardDetails = true;
  }

  hideDetails() {
    this.showCardDetails = false;
  }

  goToLink(link: string) {
    this.router.navigateByUrl(link)
  }
}
