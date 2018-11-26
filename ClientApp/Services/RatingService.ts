import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Rating } from "../Models/Rating";

@Injectable()
export class RatingService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    newRating(rating: Rating) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/rating', rating, options);
    }

    getRatingForUser(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/rating/' + email, options);
    }
}