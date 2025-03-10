import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface NewAppointmentType {
  id?: number;
  name: string;
  description: string;
  category: string[];
  price: number;
  estimatedTime: number;
  appointmentDate: string;
  requiredDocumentation: string[];
  adress: {
    number: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {
  private apiUrl = 'http://localhost:8080/appointment-types';
  private categoryUrl = 'http://localhost:8080/category';

  constructor(private http: HttpClient) {}

  createAppointmentType(appointmentType: NewAppointmentType): Observable<NewAppointmentType> {
    const headers = { 
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    };
    
    return this.http.post<NewAppointmentType>(`${this.apiUrl}/create`, appointmentType, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocorreu um erro na API:', error);
    return throwError(() => error);
  }
}