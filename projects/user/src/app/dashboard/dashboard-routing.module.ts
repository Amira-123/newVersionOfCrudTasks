import { UserGuard } from './../core/guards/user.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',
  component:LayoutComponent,
  canActivateChild:[UserGuard],
  children:[
    {path:'tasks',
     loadChildren:()=>import('./tasks/tasks.module').then(m=>m.TasksModule)

    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
