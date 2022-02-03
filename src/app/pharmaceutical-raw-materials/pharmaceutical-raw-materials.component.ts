import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CardsList} from "../../utils/common-models";

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
      newRequestLink: '',
      draftListLink: '',
      trackListLink: '',
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
    },
  ];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routingPath = event.url.split('/')[2];
      }
    });
  }

  ngOnInit(): void {
  }

}
