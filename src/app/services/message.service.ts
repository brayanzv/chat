import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8001'; // La URL de tu servidor Go

  constructor(private http: HttpClient) {}

  sendMessage(username: string, content: string): Observable<any> {
    const message = {
      username: username,
      content: content
    };
    return this.http.post<any>(`${this.apiUrl}/ws`, message); // Cambiar la ruta según tu enrutamiento
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ws`); // Cambiar la ruta según tu enrutamiento
  }
}
