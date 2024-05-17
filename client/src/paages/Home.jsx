import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

export const url = import.meta.env.VITE_SERVER_DOMAIN;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state before making a new request
    axios
      .get(`${url}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4 mb-4">
        <button
          className={`px-4 py-1 rounded-lg ${
            showType === "table" ? "bg-sky-600" : "bg-sky-300 hover:bg-sky-600"
          }`}
          onClick={() => setShowType("table")}
          aria-pressed={showType === "table"}
        >
          Table
        </button>
        <button
          className={`px-4 py-1 rounded-lg ${
            showType === "card" ? "bg-sky-600" : "bg-sky-300 hover:bg-sky-600"
          }`}
          onClick={() => setShowType("card")}
          aria-pressed={showType === "card"}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
