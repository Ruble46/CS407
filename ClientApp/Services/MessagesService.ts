import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Message } from "../Models/Message";

@Injectable()
export class MessagesService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    sendMessage(message: Message) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/message/send', message, options);
    }

    getConversation(email1: string, email2: string): Observable<Array<Message>> {
        return this.http.get<Array<Message>>(this.apiBaseUrl + 'api/message/conversation/' + email1 + '/' + email2);
    }

    /**
     * Marks the messages from sender to receiver as read
     * @param message message model with only sender and receiver
     */
    markRead(message: Message) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/message/markRead', message, options);
    }

    getUnread(email: string) {
        return this.http.get<any>(this.apiBaseUrl + 'api/message/getUnread/' + email);
    }
}