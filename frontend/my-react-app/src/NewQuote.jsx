import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = "http://localhost:8080/quotes";

function NewQuote() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [quoteSource, setQuoteSource] = useState('');

  const handleSubmit = async () => {
    if (!author || !text || !quoteSource) {
      alert("Fill all fields!");
      return;
    }

    try {
      const newQuote = { author, text, quoteSource };
      await axios.post(API_URL, newQuote);
      alert("Quote added!");
      // reset fields
      setAuthor('');
      setText('');
      setQuoteSource('');
    } catch (error) {
      console.error("Error posting quote:", error);
      alert("Failed to add quote.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-6">
        <legend className="fieldset-legend text-lg font-bold">New Quote</legend>

        <label className="label mt-4">Author</label>
        <input 
          type="text" 
          className="input input-bordered w-full" 
          placeholder="Your mum"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label className="label mt-4">Text</label>
        <textarea
          className="textarea textarea-bordered w-full h-32 resize-y"
          placeholder="Is fat"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
            className="select select-bordered w-full mt-4"
            value={quoteSource}
            onChange={(e) => setQuoteSource(e.target.value)}
          >
            <option>Movie</option>
            <option>Book</option>
            <option>RealLife</option>
            <option>Misc</option>
        </select>
        <button 
          className="btn btn-primary mt-6 w-full"
          onClick={handleSubmit}
        >
          Add Quote
        </button>
      </fieldset>
    </div>
  );
}

export default NewQuote;
