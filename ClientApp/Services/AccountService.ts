import { Injectable, Inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class AccountService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
        
        let temp: string = localStorage.getItem('email');
        this.getUserRole(temp)
        .subscribe(result => {
            let isAdmin: boolean = false;
            for(let a = 0; a < result.length; a++) {
                if(result[a] === 'Admin') {
                    isAdmin = true;
                    break;
                }
            }
            if(isAdmin) {
                localStorage.setItem('role', 'Admin');
            } else {
                localStorage.setItem('role', 'User');
            }
        }, error => {
            console.error(error);
        })
    }

    getAccount(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/account/' + email, options);
    }

    deleteAccount(email: string) {
        let body: Object = {
            email: email
        }

        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/account/delete', body, options);
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

    accountSettings(email: string, BackgroundColor: string, ChatColor: string) {
        let body: Object = {
            email: email,
            BackgroundColor: BackgroundColor,
            ChatColor: ChatColor
        };

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account', body, options);
    }

    getUserRole(email: string) {
        let options: Object = {
            
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/account/roles/' + email, options);
    }

    promoteToAdmin(email: string) {
        let body: Object = {
        };

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/roles/promote/' + email, body, options);
    }

    demoteFromAdmin(email: string) {
        let body: Object = {
        };

        let options: Object = {
            observe: 'response'
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/roles/demote/' + email, body, options);
    }

    banUser(email: string) {
        let body: Object = {
            email: email
        }

        let options: Object = {
            observe: 'response',
            headers: {'Content-Type':'application/json'}
        };

        return this.http.post<any>(this.apiBaseUrl + 'api/account/ban', body, options);
    }
}