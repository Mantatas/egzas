import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Listing added successfully");
      } else {
        console.error("Failed to add listing");
      }
    } catch (error) {
      console.error("Error adding listing:", error);
    }
    navigate("/");
  };

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <h2>Add Mechanic</h2>
      <div className="form-group mt-3">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Select a location</option>
          <option value="kaunas">Kaunas</option>
          <option value="vilnius">Vilnius</option>
          <option value="klaipeda">Klaipėda</option>
          <option value="siauliai">Šiauliai</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <button type="submit" className="btn btn-primary">
          Add listing
        </button>
      </div>
    </form>
  );
};

export default AddListing;
