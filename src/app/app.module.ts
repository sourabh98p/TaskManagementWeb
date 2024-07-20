import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { AdminComponent } from './secure/admin/admin.component';
import { ManagerComponent } from './secure/manager/manager.component';
import { EmployeeComponent } from './secure/employee/employee.component';
import { CreateTaskComponent } from './secure/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './public/Header/Header.component';
import { FooterComponent } from './public/Footer/Footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskDetailEmployeeComponent } from './secure/task-detail-employee/task-detail-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ManagerComponent,
    EmployeeComponent,
    CreateTaskComponent,
    HeaderComponent,
    FooterComponent,
    TaskDetailEmployeeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
