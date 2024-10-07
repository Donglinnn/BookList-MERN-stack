import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

// According the props "books" sent by Home.jsx, use array's map method to create the table list of book.
const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md bg-emerald-50">
            No
          </th>
          <th className="border border-slate-600 rounded-md bg-emerald-50">
            Title
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden bg-emerald-50">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden bg-emerald-50">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md bg-emerald-50">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {/* For every book inside books array, shows the information row by row. */}
        {books.map((book, index) => {
          return (
            <tr key={book._id} className="h-8">
              <th className="border border-slate-700 rounded-md text-center bg-emerald-50">
                {index + 1}
              </th>
              <td className="border border-slate-700 rounded-md text-center bg-emerald-50">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden bg-emerald-50">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden bg-emerald-50">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center bg-emerald-50">
                <div className="flex justify-center gap-x-4">
                  {/* Use the icons in react-icons to link to the certain page of the book. */}
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BooksTable;
