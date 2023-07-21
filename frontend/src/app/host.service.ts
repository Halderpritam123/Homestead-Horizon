import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from './models/host.model'; // Replace '../models/host' with the actual path to the host model

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private baseUrl = 'http://localhost:5000/api/hosts';

  constructor(private http: HttpClient) { }

  getAllHosts(): Observable<Host[]> {
    return this.http.get<Host[]>(this.baseUrl);
  }

  getHostById(hostId: string): Observable<Host> {
    return this.http.get<Host>(`${this.baseUrl}/${hostId}`);
  }

  createHost(host: Host): Observable<any> {
    return this.http.post(this.baseUrl, host);
  }

  updateHost(hostId: string, host: Host): Observable<any> {
    return this.http.put(`${this.baseUrl}/${hostId}`, host);
  }

  deleteHost(hostId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${hostId}`);
  }
}
