package com.ecommerce.dto;

import com.ecommerce.entity.Order;
import java.time.LocalDateTime;

public class OrderResponse {
    private Long id;
    private LocalDateTime date;
    private Double total;
    private String statut;
    private String message;

    public static OrderResponse from(Order order) {
        OrderResponse dto = new OrderResponse();
        dto.setId(order.getId());
        dto.setDate(order.getDate());
        dto.setTotal(order.getTotal());
        dto.setStatut(order.getStatut().name());
        dto.setMessage("Commande #" + order.getId() + " confirmée !");
        return dto;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
