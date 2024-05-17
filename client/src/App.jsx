import { Route, Routes } from "react-router-dom";
import Home from "./paages/Home";
import CreateBook from "./paages/CreateBook";
import ShowBook from "./paages/ShowBook";
import EditBook from "./paages/EditBook";
import DeleteBook from "./paages/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
