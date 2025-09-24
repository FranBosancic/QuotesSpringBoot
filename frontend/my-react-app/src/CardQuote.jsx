import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Nije full refresh, nego samo update
      setQuotes(quotes.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('hr-HR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date(date));
  };






  return (
    <div className="flex flex-col items-center mx-auto my-10">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="card bg-primary text-primary-content w-full max-w-md shadow-xl m-4 hover:scale-[1.02] transition-transform"
        >
          <Link to={`/view-single-quote/${quote.id}`} className="block">
          <div className="card-body">
            <div className="flex justify-between">

              <h2 className="card-title">{quote.author}</h2>
              <div>
                <Link to={`/edit-quote/${quote.id}`}>
                  <button className="px-2 py-1 font-small text-gray-600 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391zm-80 80v-170l528-527q12-11 26.5-17t30.5-6 31 6 26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120zm640-584-56-56zm-141 85-28-29 57 57z" /></svg>
                  </button>
                </Link>
                <button onClick={() => handleDelete(quote.id)} className="px-2 py-1 font-small text-gray-600 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120zm400-600H280v520h400zM360-280h80v-360h-80zm160 0h80v-360h-80zM280-720v520z" /></svg>
                </button>
              </div>
            </div>
            <p>{quote.text}</p>

            <div className="flex justify-between items-center text-sm mt-4">
              <span>{quote.quoteSource}</span>
              <span>Created: {formatDateTime(quote.dateAdded)}</span>
            </div>
            <div className="flex justify-end items-center text-sm mt-1">
              <span>Updated: {formatDateTime(quote.dateUpdated)}</span>
            </div>
          </div>
          </Link>
        </div>

      ))}
    </div>
  );
}

export default CardQuote;
