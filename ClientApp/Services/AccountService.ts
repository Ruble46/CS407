import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class AccountService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    passwordResetRequest(email: string) {
        let body: Object = {
            email: email
        }

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/reset/request', body, options);
    }

    passwordReset(email, newPassword, token) {
        let body: Object = {
            email: email,
            newPassword: newPassword,
            token: token
        }

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/reset', body, options);
    }
}