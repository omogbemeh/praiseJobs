import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AppInterceptor implements HttpInterceptor {
  private clearBitKey = 'sk_d10604acff6a4d16ff02617e863793f6';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('adzuna')) {
      const request = req.clone({
        setParams: {
          app_id: 'd3e809b4',
          app_key: '32dfacc5aa9473284252b45387c30776',
        },
      });
      return next.handle(request);
    } else {
      const modReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.clearBitKey}`,
        },
      });
      return next.handle(modReq);
    }
  }
}

// app_id: 'd3e809b4',
// "app_key": '32dfacc5aa9473284252b45387c30776'
