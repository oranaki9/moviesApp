import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { UtilsService } from "./utils/utils.service";
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private utils: UtilsService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const errorMassage = error.error.massage || "Server Error.";
        this.utils.openDialog("massage", { data: errorMassage });
        return throwError(error);
      })
    );
  }
}
