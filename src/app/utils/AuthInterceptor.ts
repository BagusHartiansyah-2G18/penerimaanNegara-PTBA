import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Elogin } from "../login/state/model";
import { Router } from "@angular/router";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: Elogin, private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();
    if(authToken==null){
      if(this.router.url!='/'){ 
        this.router.navigateByUrl("/");
      } 
    }
    
    
    
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', String(authToken))
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}