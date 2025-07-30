import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHttpOptions());
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project, this.getHttpOptions());
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project, this.getHttpOptions());
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token || ''
      })
    };
  }
}
