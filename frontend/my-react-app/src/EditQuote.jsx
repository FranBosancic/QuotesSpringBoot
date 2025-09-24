import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/quotes";

function EditQuote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [quoteSource, setQuoteSource] = useState("");

  // Ovo vraca sve podatke citata
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const q = res.data;
        setAuthor(q.author);
        setText(q.text);
        setQuoteSource(q.quoteSource);
      })
      .catch((err) => {
        console.error("Error fetching quote:", err);
        alert("Could not load quote.");
      });
  }, [id]);

  // Submit izmjena
  const handleSubmit = async () => {
    if (!author || !text || !quoteSource) {
      alert("Fill all fields!");
      return;
    }

    try {
      const updatedQuote = { author, text, quoteSource };
      await axios.put(`${API_URL}/${id}`, updatedQuote);
      alert("Quote updated!");
      navigate("/"); // vrati na listu nakon spremanja
    } catch (error) {
      console.error("Error updating quote:", error);
      alert("Failed to update quote.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-6">
        <legend className="fieldset-legend text-lg font-bold">
          Edit Quote
        </legend>

        <label className="label mt-4">Author</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label className="label mt-4">Text</label>
        <textarea
          className="textarea textarea-bordered w-full h-30 resize-y"
          placeholder="Quote text"
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

        <div className="flex gap-2 mt-6">
          <button
            className="btn btn-outline w-1/2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button className="btn btn-primary w-1/2" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default EditQuote;
