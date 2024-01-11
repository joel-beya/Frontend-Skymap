// star.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllStars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stars`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Si erreur 401, tentez de rafraîchir le token et réessayez la requête
          return this.refreshTokenAndRetry(() => this.http.get<any>(`${this.apiUrl}/stars`));
        }
        return throwError(error);
      })
    );
  }
  getHottest(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stars/hottest`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Si erreur 401, tentez de rafraîchir le token et réessayez la requête
          return this.refreshTokenAndRetry(() => this.http.get<any>(`${this.apiUrl}/stars/hottest`));
        }
        return throwError(error);
      })
    );
  }
  getClosest(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stars/closest`).pipe(
      catchError((error: any) => { // Spécifiez le type 'any' ici
        console.error('Error in getClosest:', error);

        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Si erreur 401, tentez de rafraîchir le token et réessayez la requête
          return this.refreshTokenAndRetry(() => this.http.get<any>(`${this.apiUrl}/stars/closest`));
        }

        return throwError(error);
      })
    );
  }



  private refreshTokenAndRetry(request: () => Observable<any>): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap(() => request()),
      catchError((error) => {
        // Gérez les erreurs de rafraîchissement du token ici
        return throwError(error);
      })
    );
  }
}

