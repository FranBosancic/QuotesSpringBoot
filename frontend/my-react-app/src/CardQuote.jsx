import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/quotes';

function CardQuote() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

return (
  <div className="flex flex-col items-center mx-auto my-10">
    {quotes.map((quote) => (
      <div
        key={quote.id}
        className="card bg-primary text-primary-content w-full max-w-md shadow-xl m-4"
      >
        <div className="card-body">
          <h2 className="card-title">{quote.author}</h2>
          <p>{quote.text}</p>

          <div className="flex justify-between items-center text-sm mt-4">
            <span>{quote.quoteSource}</span>
            <span>{new Date(quote.dateAdded).toDateString()}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default CardQuote;
