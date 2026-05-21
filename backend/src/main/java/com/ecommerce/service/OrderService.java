package com.ecommerce.service;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.dto.OrderResponse;
import com.ecommerce.entity.*;
import com.ecommerce.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public OrderResponse createOrder(OrderRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Check stock
        for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
            if (product.getStock() < itemRequest.getQuantite()) {
                throw new RuntimeException("Stock insuffisant pour: " + product.getNom());
            }
        }

        Order order = new Order();
        order.setUser(user);

        List<OrderItem> items = new ArrayList<>();
        double total = 0.0;

        for (OrderRequest.OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId()).get();
            product.setStock(product.getStock() - itemRequest.getQuantite());
            productRepository.save(product);

            OrderItem item = new OrderItem(order, product, itemRequest.getQuantite(), product.getPrix());
            items.add(item);
            total += product.getPrix() * itemRequest.getQuantite();
        }

        order.setItems(items);
        order.setTotal(Math.round(total * 100.0) / 100.0);
        order.setStatut(Order.Statut.CONFIRMEE);

        Order savedOrder = orderRepository.save(order);
        return OrderResponse.from(savedOrder);
    }

    public List<Order> getUserOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return orderRepository.findByUserOrderByDateDesc(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByDateDesc();
    }
}
