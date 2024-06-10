import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const Book = () => {
  const { id } = useParams();

  const GET_BOOK = gql`
    query GetBook($id: ID!) {
      book(id: $id) {
        id
        name
        author
        year
        category
        total
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data.book) return <p>No book found</p>;

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>DETAIL BOOK</h3>
      <div className="card">
        <h3>TITLE : {data.book.name}</h3>
        <p>AUTHOR : {data.book.author}</p>
        <p>YEAR : {data.book.year}</p>
        <p>CATEGORY : {data.book.category}</p>
        <p>TOTAL : {data.book.total}</p>
        <hr />
        <Link to={"/"} className="btn">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Book;
