import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class LoginRegisterService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    signUp(email: string, password: string): Observable<any> {
        let body: Object = {
            email: email,
            password: password
        }

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/register', body, options);
    }

    signIn(email: string, password: string): Observable<any> {
        let body: Object = {
            email: email,
            password: password
        }

        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/account/login', body, options);
    }

}