import { Injectable } from '@angular/core';
import { HttpHelper } from '../helper/http-helper';
import { ConfigurationService } from './configuration.service';
import { CommonService } from './common.service';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceResponseModel, Task } from '../models/Common-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpHelper: HttpHelper ,private configurationService: ConfigurationService , private commonService :  CommonService) { }
  getReports(model: string): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
  getTasksAndEmployees(model: number): Observable<ServiceResponseModel> {
      return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
  createTask(model: Task): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
  getTaskDetails(model: any): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
  updateTask(model: any): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
  getEmployeeTasks(model: any): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.invoiceDetailsApiUrl);
  }
 
}
