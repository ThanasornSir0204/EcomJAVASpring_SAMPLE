package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product saveProduct(Product product); 
    void deleteProductById(String id);Product updateProduct(String id, Product product);
}
