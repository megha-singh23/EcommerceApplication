package com.ecommerce.service;

import com.ecommerce.dto.OrderResponse;
import com.ecommerce.dto.PlaceOrderRequest;
import com.ecommerce.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponse placeOrder(Long userId, PlaceOrderRequest request);
    Page<OrderResponse> getOrdersForUser(Long userId, Pageable pageable);
    Page<OrderResponse> getAllOrders(Pageable pageable);
    OrderResponse getOrderById(Long orderId, Long requestingUserId, boolean isAdmin);
    OrderResponse updateOrderStatus(Long orderId, OrderStatus status);
}
