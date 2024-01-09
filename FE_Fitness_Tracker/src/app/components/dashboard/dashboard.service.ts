import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'TODO';
  constructor(private http: HttpClient) { }

  //GET user progress
  //GET /user-progress/{userId}
  getUserProgress(userId: string): Observable<any> {
    return this.http.get(`${this.url}/user-progress/${userId}`);
  }

}
