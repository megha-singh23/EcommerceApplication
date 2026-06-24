package com.ecommerce.service;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.dto.CartResponse;

public interface CartService {
    CartResponse getCartForUser(Long userId);
    CartResponse addItem(Long userId, CartItemRequest request);
    CartResponse updateItemQuantity(Long userId, Long itemId, Integer quantity);
    CartResponse removeItem(Long userId, Long itemId);
    void clearCart(Long userId);
}
