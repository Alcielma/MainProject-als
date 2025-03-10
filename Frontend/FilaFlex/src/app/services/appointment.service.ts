import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  id: string;
  name: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointments'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  getAppointmentTypeDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointment-types/${id}`);
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, appointmentData);
  }
}