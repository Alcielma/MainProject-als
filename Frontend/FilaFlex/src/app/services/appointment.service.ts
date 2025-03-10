import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AppointmentSchedule {
  appointmentType: {
    id: number;
  };
  user: {
    id: number;
  };
  scheduledDateTime: string;
}

export interface Agendamento {
  id: number;
  descricao: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointment'; 

  constructor(private http: HttpClient) { }

  scheduleAppointment(appointment: AppointmentSchedule): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.apiUrl}/create`, appointment, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  //pegar o agendamento
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }
  //deletar o agendamento
  deleteAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro no agendamento:', error);
    return throwError(() => error);
  }
}