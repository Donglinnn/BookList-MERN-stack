import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    // According to the width of device, showing 2, 3, or 4 grids in one row.
    // For every book inside books array, shows a book card for the information.
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookSingleCard book={book} key={book._id} />
      ))}
    </div>
  );
};

export default BooksCard;
