import { useState } from "react";

const AddCategory = async (category) => {
  const [currentCategory, setCategory] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setCategory({
      ...currentCategory,
      [e.target.name]: e.target.value,
    });
  };

  try {
    const response = await fetch("http://localhost:8080/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  } catch (error) {
    console.error("Error adding category:", error);
  }
  return (
    <form>
      <div>
        <label htmlFor="category">Add a category:</label>
        <input
          type="text"
          name="category"
          className="form-control"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddCategory;
