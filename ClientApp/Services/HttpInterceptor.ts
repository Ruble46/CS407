import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import 'rxjs/add/observable/throw';
import { RequestTracker } from '../Models/RequestTracker';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<number>;
  private request$: BehaviorSubject<RequestTracker>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(0);
    let temp: RequestTracker = new RequestTracker();
    this.request$ = new BehaviorSubject(temp);
  }

  setRequest(url: string, method: string) {
    let temp: RequestTracker = new RequestTracker();
    temp.URL = url;
    temp.Method = method;
    this.request$.next(temp);
    temp = null;
  }

  getRequest(): Observable<RequestTracker> {
    return this.request$.asObservable();
  }

  incrementCounter() {
    var inc: number = this.requestInFlight$.getValue() + 1;
    this.requestInFlight$.next(inc);
  }

  decrementCounter() {
    var dec: number = this.requestInFlight$.getValue() - 1;
    this.requestInFlight$.next(dec);
  }

  getCounter(): Observable<number> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  constructor(private status: HTTPStatus) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.incrementCounter();

    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return throwError(error);
      }),
      finalize(() => {
        this.status.decrementCounter();
        this.status.setRequest(req.url, req.method);
      })
    )
  }
}