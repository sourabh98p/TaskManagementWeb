import { Injectable } from '@angular/core';
import { HttpHelper } from '../helper/http-helper';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from '../models/user-response';
import { ServiceResponseModel } from '../models/Common-model';
import { ConfigurationService } from './configuration.service';
import { CommonService } from './common.service';
import { UserDetails } from '../models/user-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserResponse: UserDetails = new UserDetails();
  constructor(private httpHelper: HttpHelper ,private configurationService: ConfigurationService , private commonService :  CommonService) {
  }

  isLoggedIn(): boolean {
    return this.commonService.getRole() !==null;
  }

  login(model: LoginRequest): Observable<ServiceResponseModel> {
    return this.httpHelper.postHelperWithoutToken(model, this.configurationService.invoiceDetailsApiUrl);

}

getUserRole(): string {
  return this.commonService.getRole();
}

logout(): void {
  this.commonService.clearRole;
  this.commonService.clearTokenDetails;
  this.commonService.clearUserDetails;
  this.commonService.clearUserid;
  // Implement logout logic, clear session or token if necessary
}

}
