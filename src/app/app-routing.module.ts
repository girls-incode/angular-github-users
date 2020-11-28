import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'userlist' },
  {
    path: 'userlist',
    component: UsersListComponent,
    data: { animation: 'Left-Right' },
  },
  {
    path: 'user/:username',
    component: UserDetailsComponent,
    data: { animation: 'Right-Left' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'Left-Right' },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
