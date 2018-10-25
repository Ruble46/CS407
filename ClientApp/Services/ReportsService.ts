import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ReportUser } from "../Models/ReportUser";

@Injectable()
export class ReportsService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    getAllReports() {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/report', options);
    }

    createReport(report: ReportUser) {
        let body: Object = {
            Reason: report.reason,
            Description: report.description,
            Reporter: report.reporter,
            Reported: report.reported,
            Assigned: ''
        }

        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/report', body, options);
    }

    assignToReport(email: string, reportID: string) {
        let options: Object = {
            observe: 'response'
        }

        let body: Object = {
            email: email
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/report/' + reportID, body, options);
    }
}