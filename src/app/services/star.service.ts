import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private apiUrl = 'http://127.0.0.1:5000/stars';
  constructor(private http: HttpClient) { }

  //Recuperer toutes étoiles
  getAllStars(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
