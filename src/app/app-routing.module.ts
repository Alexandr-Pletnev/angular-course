import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {EditPageComponent} from "./admin/edit-page/edit-page.component";
import {AdminLayoutComponent} from "./admin/shared/components/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '',  redirectTo:'/',  pathMatch:'full' },
      { path: '',  component: HomePageComponent },
      { path: 'post/:id', component: PostPageComponent }
    ]
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
