import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAppConfig } from '../../models/appsetting';
import ServiceUrlConstants from '../service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private configData: IAppConfig | undefined;
  private _initialized = false;
  constructor(private httpClient: HttpClient) { }
  async loadConfigurationData(): Promise<boolean> {
      try {
          const response = await this.httpClient
              .get<IAppConfig>(ServiceUrlConstants.AppSettingData, {
                  headers: this.getHttpHeader()
              })
              .pipe(catchError(this.handleError)).toPromise();
          this.configData = response;
          this._initialized = true;
          return true;
      } catch (err) {
          return false;
      }
  }
  get initialized(): boolean {
      return this._initialized;
  }
  get config(): IAppConfig | undefined {
      return this.configData;
  }
  get apiUrl(): string | undefined {
      return "https://localhost:44391/tapi/";
  }
get validateUserUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.ValidateUser;
}

get refreshTokenUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.RefreshToken;
}

get createTaskUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.CreateTask;
}

get updateTaskUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.UpdateTask;
}

get deleteTaskUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.DeleteTask;
}

get getTaskReportUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.GetTaskReport;
}

get getTaskUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.GetTask;
}

get getEmployeeTaskListUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.GetEmployeeTaskList;
}

get getTasksAndEmployeesListUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.GetTasksAndEmployeesList;
}

get getTaskDetailsEmployeeUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.GetTaskDetailsEmployee;
}

get addTaskNoteUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.AddTaskNote;
}

get addTaskAttachmentUrl(): string | undefined {
    return this.apiUrl + ServiceUrlConstants.AddTaskAttachment;
}
  private getHttpHeader(): HttpHeaders {
      return new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Cache-Control', 'no-cache ')
          .set('Pragma', 'application/json')
          .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
  }
  handleError(error: HttpErrorResponse | any): Observable<never> {
      return throwError(() => error);
  }
}
