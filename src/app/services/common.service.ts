import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse, TokenDetails, UserDetails } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private LoadingSource = new BehaviorSubject<boolean>(false);
  private ShowCustomLoader = new BehaviorSubject<boolean>(false);
  loadingSource$: Observable<boolean> = this.LoadingSource.asObservable();
  showCustomLoader$: Observable<boolean> = this.ShowCustomLoader.asObservable();
  loaderTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Loading...');
  loaderText$: Observable<string> = this.loaderTextSubject.asObservable();

  showLoader(): void {
      this.LoadingSource.next(true);
  }
  
  hideLoader(): void {
      this.LoadingSource.next(false);
  }
  showCustomLoader(text?:string): void {
      this.ShowCustomLoader.next(true);
      if (text) {
          this.loaderTextSubject.next(text);
      }
  }
  
  hideCustomLoader(): void {
      this.ShowCustomLoader.next(false);
      this.loaderTextSubject.next('Loading...');
  }
  
  setUserDetails(data: UserDetails): void {
      sessionStorage.setItem("userDetails", JSON.stringify(data));
  }
  getUserDetails(): any {
    const userDetailsString = sessionStorage.getItem("userDetails");
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }
  clearUserDetails(): any {
      sessionStorage.removeItem("userDetails");
  }

  setTokenDetails(data: TokenDetails): void {
      sessionStorage.setItem("TokenDetails", JSON.stringify(data));
  }
  getTokenDetails(): any {
    const TokenDetails = sessionStorage.getItem("TokenDetails")
      return TokenDetails ? JSON.parse(TokenDetails) : null;
  }
  clearTokenDetails(): any {
      sessionStorage.removeItem("TokenDetails");
  }
  setRole(data: string): void {
      sessionStorage.setItem("Role", JSON.stringify(data));
  }
  getRole(): any {
      var Role = sessionStorage.getItem("Role")
      return Role ? JSON.parse(Role) : null;
  }
  clearRole(): any {
      sessionStorage.removeItem("Role");     
}

  setUserId(data: number): void {
    sessionStorage.setItem("UserId", JSON.stringify(data));
  }
  getUserid(): any {
    var Userid = sessionStorage.getItem("UserId")
    return Userid ? JSON.parse(Userid) : 0;
  }
  clearUserid(): any {
    sessionStorage.removeItem("UserId");
  }
  setTeamId(data: number): void {
    sessionStorage.setItem("TeamId", JSON.stringify(data));
  }
  getTeamid(): any {
    var teamId = sessionStorage.getItem("TeamId");
    return teamId ? JSON.parse(teamId) : 0;
  }
  clearTeamid(): any {
    sessionStorage.removeItem("TeamId");
  }
  setAssigneelist(data: any): void {
    sessionStorage.setItem("Assigneelist", JSON.stringify(data));
  }
  getAssigneelist(): any {
    var assigneeList = sessionStorage.getItem("Assigneelist");
    return assigneeList? JSON.parse(assigneeList) : null;
  }
  clearAssigneelist(): any {
    sessionStorage.removeItem("Assigneelist");
  }
  setTaskDetails(data: any): void {
    sessionStorage.setItem("TaskDetails", JSON.stringify(data));
  }
  getTaskDetails(): any {
    var TaskDetails = sessionStorage.getItem("TaskDetails");
    return TaskDetails ? JSON.parse(TaskDetails) : null;
  }
  clearTaskDetails(): any {
    sessionStorage.removeItem("TaskDetails");
  }
}
