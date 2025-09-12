package org.fran.quotesspringboot.controller;

import lombok.extern.java.Log;
import org.fran.quotesspringboot.entity.Quote;
import org.fran.quotesspringboot.service.QuoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Log
@CrossOrigin(origins = "http://localhost:5173")
public class QuoteController
{
    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService)
    {
        this.quoteService = quoteService;
    }

    @GetMapping(path = "/quotes")
    public List<Quote> getQuotes()
    {
        return quoteService.getQuotes();
    }

    @GetMapping(path = "/quotes/{id}")
    public ResponseEntity<Quote> getQuoteById(@PathVariable Long id)
    {
        Optional<Quote> quoteOptional = quoteService.getQuoteById(id);
        return quoteOptional.map(quote -> new ResponseEntity<>(quote, HttpStatus.OK)).orElseGet(() ->
                new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(path = "/quotes")
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote)
    {
        return new ResponseEntity<>(quoteService.createQuote(quote), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/quotes/{id}")
    public ResponseEntity deleteQuoteById(@PathVariable Long id)
    {
        quoteService.deleteQuoteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

// Iskreno ovo je mozda previse kompliciranja i bolje da se full i partial update ponasaju kao jedan
//    @PutMapping(path = "/quotes/{id}")
//    public ResponseEntity<Quote> fullQuoteUpdate(@PathVariable Long id, @RequestBody Quote quote)
//    {
//        if (!quoteService.existsById(id))
//        {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        Quote savedQuote = quoteService.fullUpdate(id, quote);
//        return new ResponseEntity<>(savedQuote, HttpStatus.OK);
//    }
//
//    @PatchMapping(path = "/quotes/{id}")
//    public ResponseEntity<Quote> partialQuoteUpdate(@PathVariable Long id, @RequestBody Quote quote)
//    {
//        if (!quoteService.existsById(id))
//        {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        Quote savedQuote = quoteService.partialUpdate(id, quote);
//        return new ResponseEntity<>(savedQuote, HttpStatus.OK);
//    }

    @PutMapping(path = "/quotes/{id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable Long id, @RequestBody Quote quote)
    {
        if (!quoteService.existsById(id))
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Quote savedQuote = quoteService.updateQuote(id, quote);
        return new ResponseEntity<>(savedQuote, HttpStatus.OK);
    }


}
