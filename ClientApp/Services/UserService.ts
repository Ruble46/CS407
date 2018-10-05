import { Injectable, Inject } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../Models/User";

@Injectable()
export class UserService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    getUser(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/user/' + email, options);
    }
}