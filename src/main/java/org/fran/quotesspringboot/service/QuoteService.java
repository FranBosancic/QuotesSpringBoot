package org.fran.quotesspringboot.service;

import org.fran.quotesspringboot.entity.Quote;
import org.fran.quotesspringboot.repository.QuoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuoteService
{
    private final QuoteRepository quoteRepository;

    public QuoteService(QuoteRepository quoteRepository)
    {
        this.quoteRepository = quoteRepository;
    }

    public List<Quote> getQuotes()
    {
        return quoteRepository.findAll();
    }

    public Quote createQuote(Quote quote)
    {
        return quoteRepository.save(quote);
    }

    public Optional<Quote> getQuoteById(Long id)
    {
        return quoteRepository.findById(id);
    }

    public void deleteQuoteById(Long id)
    {
        quoteRepository.deleteById(id);
    }

    public boolean existsById(Long id)
    {
        return quoteRepository.existsById(id);
    }

//    Ovo su 2 razlicite metode za update ali ce biti napravljena kao jedna jer nije zbunjujuce
//    //Ovo basically radi istu stvar kao i create Quote, ali je kinda zbunjujuce
//    public Quote fullUpdate(Long id, Quote quoteToBeUpdated)
//    {
//        quoteToBeUpdated.setId(id);
//        return quoteRepository.save(quoteToBeUpdated);
//    }
//    public Quote partialUpdate(Long id, Quote quoteToBeUpdated)
//    {
//        return quoteRepository.findById(id)
//                .map(existingQuote ->
//                {
//                    Optional.ofNullable(quoteToBeUpdated.getText()).ifPresent(existingQuote::setText);
//                    Optional.ofNullable(quoteToBeUpdated.getAuthor()).ifPresent(existingQuote::setAuthor);
//                    Optional.ofNullable(quoteToBeUpdated.getQuoteSource()).ifPresent(existingQuote::setQuoteSource);
//                    return quoteRepository.save(existingQuote);
//                }).orElseThrow(() -> new RuntimeException("Quote does not exist"));
//    }

    public Quote updateQuote(Long id, Quote quoteToBeUpdated)
    {
        return quoteRepository.findById(id)
                .map(existingQuote ->
                {
                    Optional.ofNullable(quoteToBeUpdated.getText()).ifPresent(existingQuote::setText);
                    Optional.ofNullable(quoteToBeUpdated.getAuthor()).ifPresent(existingQuote::setAuthor);
                    Optional.ofNullable(quoteToBeUpdated.getQuoteSource()).ifPresent(existingQuote::setQuoteSource);
                    existingQuote.setDateUpdated(LocalDateTime.now());
                    return quoteRepository.save(existingQuote);
                }).orElseThrow(() -> new RuntimeException("Quote does not exist"));
    }
}
