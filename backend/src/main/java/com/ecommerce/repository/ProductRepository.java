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
            WHERE (CAST(:keyword AS text) IS NULL OR
                   LOWER(CAST(p.name AS text)) LIKE LOWER(CONCAT('%', CAST(:keyword AS text), '%')) OR
                   LOWER(CAST(p.description AS text)) LIKE LOWER(CONCAT('%', CAST(:keyword AS text), '%')))
            AND (CAST(:categoryId AS bigint) IS NULL OR p.category_id = CAST(:categoryId AS bigint))
            ORDER BY p.id DESC
            """,
            countQuery = """
            SELECT COUNT(*) FROM products p
            WHERE (CAST(:keyword AS text) IS NULL OR
                   LOWER(CAST(p.name AS text)) LIKE LOWER(CONCAT('%', CAST(:keyword AS text), '%')) OR
                   LOWER(CAST(p.description AS text)) LIKE LOWER(CONCAT('%', CAST(:keyword AS text), '%')))
            AND (CAST(:categoryId AS bigint) IS NULL OR p.category_id = CAST(:categoryId AS bigint))
            """,
            nativeQuery = true)
    Page<Product> search(@Param("keyword") String keyword,
                         @Param("categoryId") Long categoryId,
                         Pageable pageable);
}