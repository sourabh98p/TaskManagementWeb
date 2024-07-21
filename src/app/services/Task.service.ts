import { Injectable } from '@angular/core';
import { HttpHelper } from '../helper/http-helper';
import { ConfigurationService } from './ConfigurationService/configuration.service';
import { CommonService } from './common.service';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceResponseModel, Task } from '../models/Common-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpHelper: HttpHelper ,private configurationService: ConfigurationService , private commonService :  CommonService) { }
  getReports(model: string): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.getTaskReportUrl);
  }
  getTasksAndEmployees(model: number): Observable<ServiceResponseModel> {
      return this.httpHelper.postHelper(model, this.configurationService.getTasksAndEmployeesListUrl);
  }
  createTask(model: Task , isEdit : boolean): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, isEdit ? this.configurationService.updateTaskUrl:this.configurationService.createTaskUrl);
  }
  getTaskDetails(model: any): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.getTaskDetailsEmployeeUrl);
  }
  updateTask(model: any , IsNote: boolean): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, IsNote ? this.configurationService.addTaskNoteUrl :this.configurationService.addTaskAttachmentUrl);
  }
  getEmployeeTasks(model: any): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.getEmployeeTaskListUrl);
  }
  deleteTask(model: Task ): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelper(model, this.configurationService.deleteTaskUrl);
  }
 
}
