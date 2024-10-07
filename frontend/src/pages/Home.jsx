import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  // States:
  // 1. books is the array of all books.
  // 2. loading is a boolean representing whether the data is loading.
  //    When loading is true, shows Spinner, otherwise shows the table.
  // 3. A state of showType is needed, users can change the form of homepage from either Table or Card.
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  // What to do when the page being rendered first time.
  useEffect(() => {
    // Represent the loading spinner animation.
    setLoading(true);

    // Get all data of books and store into books array using useState hook.
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {/* Buttons for users to change the layout of the book list. */}
      <div className="flex justify-center items-center gap-x-4 mt-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg hover:scale-105"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg hover:scale-105"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl my-8 px-4">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-105" />
        </Link>
      </div>
      {/* If loading is true, show the spinner animation. If not, check the state of showType and show the related component. */}
      {/* Also, send books as prop to Bookstable and BookCard components. */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
