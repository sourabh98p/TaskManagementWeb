import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services/ConfigurationService/configuration.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpHelper {
    constructor(private httpClient: HttpClient, private appSetting: ConfigurationService) {
    }

    public getHelper<T>(body: any, Url: any): Observable<T> {
        return this.httpClient
            .get<T>(Url, {
                headers: this.getHttpHeader(),
                params: body
            })
            .pipe(catchError(this.handleError));
    }
    public postHelper<T>(body: any, Url: any): Observable<T> {
        return this.httpClient
            .post<T>(Url, body, {
                headers: this.getHttpHeader()
            })
            .pipe(catchError(this.handleError));
    }
    public putHelper<T>(body: any, url: string): Observable<T> {
        return this.httpClient
            .put<T>(url, body, {
                headers: this.getHttpHeader()
            })
            .pipe(catchError(this.handleError));
    }
    public deleteHelper<T>(body: any,url: string): Observable<T> {
        return this.httpClient
            .delete<T>(url, {
                headers: this.getHttpHeader(),
                params: body
            })
            .pipe(catchError(this.handleError));
    }
    public postHelperWithoutToken<T>(body: any, Url: any): Observable<T> {
        console.log("login", Url);
        return this.httpClient
            .post<T>(Url, body, {
                headers: this.getHttpHeader()
            })
            .pipe(catchError(this.handleError));
    }
    public getHelperTest<T>(url:string) :Observable<T> {
        return this.httpClient.get<T>(url).pipe(catchError(this.handleError));
    }
    private getHttpHeader(): HttpHeaders {
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache ')
            .set('Pragma', 'application/json')
            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
    private refeshToken(): Observable<Response> {
        console.log('Token Refresh');
        return this.httpClient
            .get<Response>(`${this.appSetting.refreshTokenUrl}`, {
                headers: this.getHttpHeader()
            })
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse | any): Observable<never> {
        return throwError(error);
    }
}
