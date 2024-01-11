// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            localStorage.setItem('yourAuthTokenKey', response.access_token);
          }
        })
      );
  }


  getToken(): string | null {
    const token = localStorage.getItem('yourAuthTokenKey');
    return token !== null ? token : ''; // Utilisez une chaîne vide ou une valeur par défaut appropriée
  }

  // Vous pouvez ajouter une méthode pour rafraîchir le token
  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`,{})
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            localStorage.setItem('yourAuthTokenKey', response.access_token);
          }
        })
      );
  }

}
