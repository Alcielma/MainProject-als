import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointmentDetails: any;
  appointmentTypeId: string | null = null;
  scheduledDateTime: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Criar formulário
    this.appointmentForm = this.fb.group({
      time: ['', Validators.required]
    });

    // Obter o ID do tipo de agendamento da rota
    this.appointmentTypeId = this.route.snapshot.paramMap.get('id');
    if (this.appointmentTypeId) {
      // Buscar os detalhes do serviço do backend
      this.appointmentService.getAppointmentTypeDetails(this.appointmentTypeId).subscribe(data => {
        this.appointmentDetails = data;
        this.scheduledDateTime = data.scheduledDateTime.split('T')[0]; // Definir a data agendada
      });
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const userId = this.authService.getUserId();
      if (userId === null) {
        alert('Usuário não está logado.');
        return;
      }

      const appointmentData = {
        appointmentType: { id: this.appointmentTypeId },
        user: { id: userId },
        scheduledDateTime: `${this.scheduledDateTime}T${this.appointmentForm.value.time}:00`
      };

      console.log('Dados do agendamento:', appointmentData); // Adicione este log para verificar os dados

      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          console.log('Agendamento realizado com sucesso!', response);
          alert('Agendamento realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro ao realizar agendamento:', error);
          alert('Erro ao realizar agendamento. Tente novamente.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}