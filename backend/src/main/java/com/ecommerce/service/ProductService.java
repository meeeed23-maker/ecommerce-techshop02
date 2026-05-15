package com.ecommerce.service;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll() { return productRepository.findAll(); }
    public List<Product> findAllInStock() { return productRepository.findAllInStock(); }
    public Optional<Product> findById(Long id) { return productRepository.findById(id); }
    public List<Product> searchByName(String nom) { return productRepository.findByNomContainingIgnoreCase(nom); }
    public Product save(Product product) { return productRepository.save(product); }
    
    public Product update(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        product.setNom(productDetails.getNom());
        product.setDescription(productDetails.getDescription());
        product.setPrix(productDetails.getPrix());
        product.setImageUrl(productDetails.getImageUrl());
        product.setStock(productDetails.getStock());
        return productRepository.save(product);
    }
    
    public void delete(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        productRepository.delete(product);
    }
}
