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

    }

    getRequests(email: string) {

    }

    sendRequest(request: FriendRequest) {

    }

    acceptRequest(request: FriendRequest) {

    }

    ignoreRequest(request: FriendRequest) {

    }
}