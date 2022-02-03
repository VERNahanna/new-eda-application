import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {HomeContainerComponent} from './home-container/home-container.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {CustomReleaseComponent} from './custom-release/custom-release.component';
import {ApplicationGuard} from './application.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PharmaceuticalRawMaterialsComponent} from "./pharmaceutical-raw-materials/pharmaceutical-raw-materials.component";
import {PharmaceuticalRawMaterialsContainerComponent} from "./pharmaceutical-raw-materials-container/pharmaceutical-raw-materials-container.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {
    path: '', component: HomeContainerComponent, children: [
      {path: 'home', component: HomepageComponent, data: {animation: 'home'}, canActivate: [ApplicationGuard]},
      {path: 'dashboard', component: DashboardComponent, data: {animation: 'home'}, canActivate: [ApplicationGuard]},
      {
        path: 'pharmaceutical-row-material',
        component: PharmaceuticalRawMaterialsContainerComponent,
        canActivate: [ApplicationGuard],
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
        ]
      },
      {
        path: 'notification-list',
        component: NotificationListComponent,
        data: {animation: 'notification-list'},
        canActivate: [ApplicationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

// {
//   path: 'new-request', component: NewRequestContainerComponent,
//   children: [
//   {path: 'custom-release', component: CustomReleaseComponent, data: {animation: 'new-request'}},
// ], canActivate: [ApplicationGuard]
// },
