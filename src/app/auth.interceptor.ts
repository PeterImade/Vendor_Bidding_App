import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("jwtToken")
 
    const clonedRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }       
    })
  return next(clonedRequest);
}; 