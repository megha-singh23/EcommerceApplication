package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query(value = """
            SELECT * FROM products p
            WHERE (:keyword IS NULL OR
                   LOWER(p.name::text) LIKE LOWER(CONCAT('%', :keyword::text, '%')) OR
                   LOWER(p.description::text) LIKE LOWER(CONCAT('%', :keyword::text, '%')))
            AND (:categoryId IS NULL OR p.category_id = :categoryId)
            ORDER BY p.id DESC
            """,
            countQuery = """
            SELECT COUNT(*) FROM products p
            WHERE (:keyword IS NULL OR
                   LOWER(p.name::text) LIKE LOWER(CONCAT('%', :keyword::text, '%')) OR
                   LOWER(p.description::text) LIKE LOWER(CONCAT('%', :keyword::text, '%')))
            AND (:categoryId IS NULL OR p.category_id = :categoryId)
            """,
            nativeQuery = true)
    Page<Product> search(@Param("keyword") String keyword,
                         @Param("categoryId") Long categoryId,
                         Pageable pageable);
}