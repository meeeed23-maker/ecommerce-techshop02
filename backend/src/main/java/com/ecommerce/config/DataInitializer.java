package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            userRepository.save(new User("admin", passwordEncoder.encode("admin123"), User.Role.ROLE_ADMIN));
            System.out.println("✅ Admin créé: admin / admin123");
        }
        if (!userRepository.existsByUsername("user")) {
            userRepository.save(new User("user", passwordEncoder.encode("user123"), User.Role.ROLE_USER));
            System.out.println("✅ Utilisateur créé: user / user123");
        }

        if (productRepository.count() == 0) {
            productRepository.save(new Product("MacBook Pro M3", "Apple M3, 16GB RAM, 512GB SSD", 2499.99, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 15));
            productRepository.save(new Product("iPhone 15 Pro", "Apple A17 Pro, 6.1\" Super Retina XDR", 1199.99, "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", 30));
            productRepository.save(new Product("Sony WH-1000XM5", "Casque audio à réduction de bruit active", 349.99, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", 50));
            productRepository.save(new Product("Samsung 4K QLED 65\"", "Téléviseur 65 pouces 4K QLED", 899.99, "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", 10));
            productRepository.save(new Product("iPad Air M2", "Tablette 10.9\" avec puce M2", 799.99, "https://images.unsplash.com/photo-1544244015-0df4702598e5?w=400", 25));
            productRepository.save(new Product("Dell XPS 15", "Laptop 15.6\" OLED, Intel Core i9, RTX 4060", 1899.99, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400", 8));
            System.out.println("✅ 6 produits exemple créés");
        }
    }
}
