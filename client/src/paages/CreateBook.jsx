import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { url } from "./Home";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function validateYear(inputYear) {
    if (inputYear > currentYear) {
      toast.error("Year should not be more than the current year.");
      return false;
    }
    return true;
  }

  const handleSaveBook = async () => {
    if (!title || !author || !publishYear || !note) {
      toast.error("All fields are required.");
      return;
    }

    if (!validateYear(publishYear)) {
      return;
    }

    const data = { title, author, publishYear, note };
    setLoading(true);

    try {
      await axios.post(`${url}/books`, data);
      setLoading(false);
      toast.success("Book created successfully!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Error creating book. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-xl p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          ></textarea>
        </div>
        <button
          className="p-2 bg-sky-300 m-8 disabled:bg-gray-300"
          onClick={handleSaveBook}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBooks;
