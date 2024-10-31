import { useState, useEffect } from "react";
import "./Main.css";

const Main = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/listings");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        console.log(data);
        setListings(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchListings();
  }, []);

  console.log("this is important", listings);

  return (
    <div className="container">
      <h1>Listings</h1>
      {error && <p>Error: {error}</p>}
      {listings.map((listing) => (
        <div key={listing._id}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>Price: {listing.price}</p>
          <p>Location: {listing.location}</p>
          <p className="imgContainer">
            {listing.image && (
              <img
                className="listingImage"
                src={listing.image}
                alt={listing.title}
              />
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Main;
