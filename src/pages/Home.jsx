import { Link } from "react-router-dom";
import "../App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
      author
    }
  }
`;

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      author
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh data setelah mutasi
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="title">LEARN GRAPHQL</h1>
      <h3 style={{ textAlign: "center" }}>ALL BOOKS</h3>
      <div className="container">
        <div className="card">
          <Link to="/create" className="btn">
            Add Book
          </Link>
        </div>
      </div>
      <div className="container">
        {data.books.map((book) => (
          <div key={book.id} className="card">
            <h3>TITLE: {book.name}</h3>
            <p>AUTHOR: {book.author}</p>
            <hr />
            <div className="flex">
              <Link to={"/book/" + book.id} className="btn">
                Edit
              </Link>
              <button
                className="btn btn-delete"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this book?")
                  ) {
                    deleteBook({ variables: { id: book.id } });
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
