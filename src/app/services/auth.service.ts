import { Injectable } from '@angular/core';
import { HttpHelper } from '../helper/http-helper';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest, TokenDetails } from '../models/user-response';
import { ServiceResponseModel } from '../models/Common-model';
import { ConfigurationService } from './ConfigurationService/configuration.service';
import { CommonService } from './common.service';
import { UserDetails } from '../models/user-response';
import { isAfter, parseISO } from 'date-fns';
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
    return this.httpHelper.postHelperWithoutToken(model, this.configurationService.validateUserUrl);

}

getUserRole(): string {
  return this.commonService.getRole();
}

isAccessTokenExpire(): boolean {
  let isTokenExpired = true;
  const tokenDetails = this.commonService.getTokenDetails() ? JSON.parse(this.commonService.getTokenDetails()) as TokenDetails : null;

  if (tokenDetails && tokenDetails.tokenExpriationDate) {
    const expirationDate = parseISO(tokenDetails.tokenExpriationDate.toString());
    if (isAfter(expirationDate, new Date())) {
      isTokenExpired = false;
    }
  }

  return isTokenExpired;
}

logout(): void {
  this.commonService.clearRole;
  this.commonService.clearTokenDetails;
  this.commonService.clearUserDetails;
  this.commonService.clearUserid;
  // Implement logout logic, clear session or token if necessary
}

}
