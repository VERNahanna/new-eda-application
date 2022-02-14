import { Component, OnInit } from '@angular/core';
import {CardsList} from "../../../utils/common-models";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-cosmetics-products',
  templateUrl: './cosmetics-products.component.html',
  styleUrls: ['./cosmetics-products.component.scss']
})
export class CosmeticsProductsComponent implements OnInit {
  routingPath: string;
  cosmeticsProductsImportationServices: CardsList[] = [
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
  ];
  cosmeticsProductsReleaseServices: CardsList[] = [
    {
      id: '',
      name: {
        en: 'text 4',
        ar: 'الجملة41'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
  ];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routingPath = event.url.split('/')[4];
        console.log('routingPath', this.routingPath)
      }
    });
  }

  ngOnInit(): void {
  }
}
