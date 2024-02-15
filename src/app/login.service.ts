import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>('https://63cfb761e52f587829a384e5.mockapi.io/Form', data);
  }

  get() {
    return this.http.get<any>('https://63cfb761e52f587829a384e5.mockapi.io/Form');
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`https://63cfb761e52f587829a384e5.mockapi.io/Form/${id}`);
  }
  delete(id: string) { 
    return this.http.delete<any>(`https://63cfb761e52f587829a384e5.mockapi.io/Form/${id}`);
  }
  update(id: string, newData: any) {
    return this.http.put<any>(`https://63cfb761e52f587829a384e5.mockapi.io/Form/${id}`, newData);
  }
  

}