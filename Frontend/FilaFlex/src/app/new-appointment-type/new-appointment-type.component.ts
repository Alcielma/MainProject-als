import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentTypeService } from '../services/appointment-type.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-appointment-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-appointment-type.component.html',
  styleUrls: ['./new-appointment-type.component.css']
})
export class NewAppointmentTypeComponent implements OnInit {
  appointmentTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentTypeService: AppointmentTypeService
  ) {}

  ngOnInit(): void {
    this.appointmentTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      estimatedTime: [0, [Validators.required, Validators.min(0)]],
      appointmentDate: ['', Validators.required],
      requiredDocumentation: [''],
      adress: this.fb.group({
        number: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.appointmentTypeForm.valid) {
      const appointmentTypeData = this.appointmentTypeForm.value;
      appointmentTypeData.category = appointmentTypeData.category.split(',').map((cat: string) => cat.trim());
      appointmentTypeData.requiredDocumentation = appointmentTypeData.requiredDocumentation.split(',').map((doc: string) => doc.trim());

      this.appointmentTypeService.createAppointmentType(appointmentTypeData).subscribe({
        next: (response) => {
          console.log('Serviço cadastrado com sucesso!', response);
          alert('Serviço cadastrado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar serviço:', error);
          alert('Erro ao cadastrar serviço. Tente novamente.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}