import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FriendRequest } from '../Models/FriendRequest';

@Injectable()
export class FriendsService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    getFriends(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/friend/' + email, options);
    }

    getRequests(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/friend/request/' + email, options);
    }

    sendRequest(request: FriendRequest) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/friend/request', request, options);
    }

    acceptRequest(request: FriendRequest) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/friend/request/accept', request, options);
    }

    ignoreRequest(request: FriendRequest) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/friend/request/ignore', request, options);
    }
}