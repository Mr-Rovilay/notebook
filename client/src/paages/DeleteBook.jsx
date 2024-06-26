import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "./Home";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${url}/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full max-w-xl p-8 mx-auto">
        <h3 className="text-2xl text-center">
          Are You Sure You want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full max-w-xs"
          onClick={handleDeleteBook}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, Delete it"}
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
