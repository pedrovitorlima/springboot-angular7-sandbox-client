import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('Attemp http://localhost:8080/auth/');
    console.log('With '  + credentials);
    
    return this.http.post('http://localhost:8080/auth/', credentials);
  }
}
