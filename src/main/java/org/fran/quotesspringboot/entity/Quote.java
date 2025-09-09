package org.fran.quotesspringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.fran.quotesspringboot.enumeration.QuoteSource;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Quote
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private String author;
    @Enumerated(EnumType.STRING)
    private QuoteSource quoteSource;
    @Column(updatable = false)
    private LocalDateTime dateAdded;

    @PrePersist
    public void prePersist()
    {
        dateAdded = LocalDateTime.now();
    }

}
