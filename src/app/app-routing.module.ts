import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { AdminComponent } from './secure/admin/admin.component';
import { EmployeeComponent } from './secure/employee/employee.component';
import { ManagerComponent } from './secure/manager/manager.component';
import { CreateTaskComponent } from './secure/create-task/create-task.component';
import { TaskDetailEmployeeComponent } from './secure/task-detail-employee/task-detail-employee.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, data: { roles: ['admin'] } },
  { path: 'employee', component: EmployeeComponent,  data: { roles: ['employee'] } },
  { path: 'manager', component: ManagerComponent,  data: { roles: ['manager'] } },
  { path: 'manager/createTask', component: CreateTaskComponent,  data: { roles: ['manager'] } },
  {path: 'manager/EditTask/:id', component: CreateTaskComponent ,  data : {roles : ['manager']}},
  {path: 'employee/mangeTask/:id', component: TaskDetailEmployeeComponent ,  data : {roles : ['employee']}},
  { path: '**', redirectTo: '/login' } // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
