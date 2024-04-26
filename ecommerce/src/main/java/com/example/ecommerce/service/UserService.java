// UserService.java
package com.example.ecommerce.service;

import com.example.ecommerce.model.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String email, String password);
}
