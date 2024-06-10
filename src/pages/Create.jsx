import { Link } from "react-router-dom";
import "../App.css";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const CREATE_BOOK = gql`
    mutation addBook(
      $name: String!
      $author: String!
      $year: Int!
      $category: String!
      $total: Int!
    ) {
      addBook(
        name: $name
        author: $author
        year: $year
        category: $category
        total: $total
      ) {
        id
        name
        author
        year
        category
        total
      }
    }
  `;

  const [addBook] = useMutation(CREATE_BOOK);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const title = event.target.title.value;
    const author = event.target.author.value;
    const year = parseInt(event.target.year.value);
    const category = event.target.category.value;
    const total = parseInt(event.target.total.value);

    const { data, error, loading } = await addBook({
      variables: {
        name: title,
        author,
        year,
        category,
        total,
      },
    });
    if (loading) {
      console.log(loading);
      setIsLoading(true);
    }

    if (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }

    if (data) {
      console.log(data);
      setMessage("Book added successfully");
      event.target.reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Add book</h1>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-error">{error}</p>}
      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          required
          name="title"
          id="title"
          className="form-input"
        />
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          required
          name="author"
          id="author"
          className="form-input"
        />
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          type="number"
          required
          name="year"
          id="year"
          className="form-input"
        />
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          required
          name="category"
          id="category"
          className="form-input"
        />
        <label htmlFor="total" className="form-label">
          Total
        </label>
        <input
          type="number"
          required
          name="total"
          id="total"
          className="form-input"
        />
        <button disabled={isLoading} className="btn" type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <Link disabled={isLoading} to="/" className="btn btn-delete">
          Back
        </Link>
      </form>
    </div>
  );
};

export default Create;
