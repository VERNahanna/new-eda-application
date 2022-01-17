import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ApprovedRequestComponent} from './approved-request/approved-request.component';
import {LoginComponent} from './login/login.component';
import {HomeContainerComponent} from './home-container/home-container.component';
import {TrackRequestContainerComponent} from './track-request-container/track-request-container.component';
import {DraftRequestsContainerComponent} from './draft-requests-container/draft-requests-container.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {CustomReleaseComponent} from './custom-release/custom-release.component';
import {ApplicationGuard} from './application.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RejectedRequestContainerComponent} from './rejected-request-container/rejected-request-container.component';
import {NewRequestContainerComponent} from "./new-request-container/new-request-container.component";
import {TrackCustomReleaseComponent} from "./track-custom-release/track-custom-release.component";
import {RejectCustomReleaseComponent} from "./reject-custom-release/reject-custom-release.component";
import {DraftCustomReleaseComponent} from "./draft-custom-release/draft-custom-release.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {
    path: '', component: HomeContainerComponent, children: [
      {path: 'home', component: HomepageComponent, data: {animation: 'home'}, canActivate: [ApplicationGuard]},
      {path: 'dashboard', component: DashboardComponent, data: {animation: 'home'}, canActivate: [ApplicationGuard]},
      {
        path: 'new-request', component: NewRequestContainerComponent,
        children: [
          {path: 'custom-release', component: CustomReleaseComponent, data: {animation: 'new-request'}},
        ], canActivate: [ApplicationGuard]
      },
      {
        path: 'track-request', component: TrackRequestContainerComponent,
        children: [
          {path: 'custom-release', component: TrackCustomReleaseComponent, data: {animation: 'track-request'}},
        ], canActivate: [ApplicationGuard]
      },
      {
        path: 'rejected-request', component: RejectedRequestContainerComponent,
        children: [
          {path: 'custom-release', component: RejectCustomReleaseComponent, data: {animation: 'rejected-request'}},
        ], canActivate: [ApplicationGuard]
      },
      {
        path: 'draft-request', component: DraftRequestsContainerComponent,
        children: [
          {path: 'custom-release', component: DraftCustomReleaseComponent, data: {animation: 'draft-request'}},
        ], canActivate: [ApplicationGuard]
      },
      {
        path: 'approved-product',
        component: ApprovedRequestComponent,
        data: {animation: 'approved-product'},
        canActivate: [ApplicationGuard]
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
