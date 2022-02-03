import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PharmaceuticalRawMaterialsContainerComponent} from "./pharmaceutical-raw-materials-container/pharmaceutical-raw-materials-container.component";
import {ApplicationGuard} from "../application.guard";
import {CustomReleaseComponent} from "../custom-release/custom-release.component";
import {PharmaceuticalRawMaterialsComponent} from "./pharmaceutical-raw-materials/pharmaceutical-raw-materials.component";

const routes: Routes = [
  {
    path: 'inner',
    component: PharmaceuticalRawMaterialsContainerComponent,
    children: [
      {
        path: 'importation-services',
        component: PharmaceuticalRawMaterialsComponent,
        data: {animation: 'pharmaceutical-row-material'}
      },
      {
        path: 'release-services',
        component: PharmaceuticalRawMaterialsComponent,
        data: {animation: 'pharmaceutical-row-material'}
      },
      {
        path: 'new-request',
        component: CustomReleaseComponent,
        data: {animation: 'pharmaceutical-row-material'}
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaceuticalRawMaterialsRoutingModule {
}
