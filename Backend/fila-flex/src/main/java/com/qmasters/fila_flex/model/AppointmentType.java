package com.qmasters.fila_flex.model;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointment_types")
public class AppointmentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, length=1000)      //Armazena até 1000 caracteres.
    private String description;

    @ElementCollection                          //Atributo Multivalorado, visto que pode está em mais de uma categoria.
    private List<String> category;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private Integer estimatedTime; // Em minutos

    @Column(nullable = false)
    private LocalDate appointmentDate;

    @ElementCollection                          //Atributo Multivalorado.
    private List<String> requiredDocumentation;

    public AppointmentType() {}

    public AppointmentType(String name, String description, List<String> category, double price,
                           Integer estimatedTime, LocalDate appointmentDate, List<String> requiredDocumentation) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.estimatedTime = estimatedTime;
        this.appointmentDate = appointmentDate;
        this.requiredDocumentation = requiredDocumentation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(Integer estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public List<String> getRequiredDocumentation() {
        return requiredDocumentation;
    }

    public void setRequiredDocumentation(List<String> requiredDocumentation) {
        this.requiredDocumentation = requiredDocumentation;
    }
}

