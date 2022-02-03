import {Component, OnInit} from '@angular/core';
import {CardsList} from "../../../utils/common-models";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-pharmaceutical-raw-materials',
  templateUrl: './pharmaceutical-raw-materials.component.html',
  styleUrls: ['./pharmaceutical-raw-materials.component.scss']
})
export class PharmaceuticalRawMaterialsComponent implements OnInit {
  routingPath: string;
  pharmaceuticalRawMaterialImportationServices: CardsList[] = [
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
      newRequestLink: '/pages/pharmaceutical-row-material/inner/new-request',
      draftListLink: '/pages/pharmaceutical-row-material/inner/draft-request',
      trackListLink: '/pages/pharmaceutical-row-material/inner/track-request',
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
      newRequestLink: '/pages/pharmaceutical-row-material/inner/new-request',
      draftListLink: '/pages/pharmaceutical-row-material/inner/draft-request',
      trackListLink: '/pages/pharmaceutical-row-material/inner/track-request',
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
      newRequestLink: '/pages/pharmaceutical-row-material/inner/new-request',
      draftListLink: '/pages/pharmaceutical-row-material/inner/draft-request',
      trackListLink: '/pages/pharmaceutical-row-material/inner/track-request',
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
      newRequestLink: '/pages/pharmaceutical-row-material/inner/new-request',
      draftListLink: '/pages/pharmaceutical-row-material/inner/draft-request',
      trackListLink: '/pages/pharmaceutical-row-material/inner/track-request',
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
      newRequestLink: '/pages/pharmaceutical-row-material/inner/new-request',
      draftListLink: '/pages/pharmaceutical-row-material/inner/draft-request',
      trackListLink: '/pages/pharmaceutical-row-material/inner/track-request',
      icon: 'fas fa-pills'
    },
  ];
  pharmaceuticalRawMaterialReleaseServices: CardsList[] = [
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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
