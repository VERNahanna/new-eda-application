import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CosmeticsProductsContainerComponent} from "./cosmetics-products-container/cosmetics-products-container.component";
import {CosmeticsProductsComponent} from "./cosmetics-products/cosmetics-products.component";
import {CustomReleaseComponent} from "../custom-release/custom-release.component";
import {DraftRequestsComponent} from "./draft-requests/draft-requests.component";
import {TrackRequestsComponent} from "./track-requests/track-requests.component";
import { PremixListComponent } from '../Premix/premix-list/premix-list.component';
import { CreateOrEditPremixComponent } from '../Premix/create-or-edit-premix/create-or-edit-premix.component';
import { CosmaticImportationComponent } from './cosmetics-importation/cosmatic-importation/cosmatic-importation.component';
import { DraftImportRequestsComponent } from './cosmetics-importation/draft-import-requests/draft-import-requests.component';
import { TrackImportRequestsComponent } from './cosmetics-importation/track-import-requests/track-import-requests.component';

const routes: Routes = [
  {
    path: 'inner',
    component: CosmeticsProductsContainerComponent,
    children: [
      {
        path: 'importation-services',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'importation-services/:departId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'importation-services/:departId/:departSecId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services/:departId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'release-services/:departId/:departSecId',
        component: CosmeticsProductsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request',
        component: CosmaticImportationComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:id',
        component: CosmaticImportationComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:serviceId/:serviceTypeId',
        component: CosmaticImportationComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:serviceId/:serviceTypeId/:serviceTypeName',
        component: CosmaticImportationComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'draft-request',
        component: DraftImportRequestsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'track-request',
        component:TrackImportRequestsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:id',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:serviceId/:serviceTypeId',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'new-request/:serviceId/:serviceTypeId/:serviceTypeName',
        component: CustomReleaseComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'draft-request',
        component: DraftRequestsComponent,
        data: {animation: 'inner'}
      },
      {
        path: 'track-request',
        component: TrackRequestsComponent,
        data: {animation: 'inner'}
      }
      ,
      {
        path: 'premix-list',
        component: PremixListComponent,
        data: {animation: 'inner'}
      },
      {
        path:'createOrEdit-premix',
        component: CreateOrEditPremixComponent,
        data: {animation: 'inner'}
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CosmeticsProductsRoutingModule {
}
