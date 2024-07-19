import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
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

    handleError(error: HttpErrorResponse | any): Observable<never> {
        return throwError(error);
    }
}
