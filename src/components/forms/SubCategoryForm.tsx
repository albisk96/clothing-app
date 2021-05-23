import { useState, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { useParams } from "react-router-dom";

import Input from "./Input";

interface ParamTypes {
  category: string;
}

interface IError {
  category?: string;
}

const SubCategoryForm = () => {
  const { addSubCategory, list } = useContext(DataContext);
  const { category } = useParams<ParamTypes>();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<IError>({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    delete error[name];
    setTitle(value);
  };

  const validation = () => {
    let err = {};
    const duplicate = list.some(
      ({ name }: any) =>
        name.toLowerCase().trim() === title.toLowerCase().trim()
    );
    if (duplicate) {
      err = { category: "This collection already exists" };
    } else if (!title) {
      err = { category: "Collection's name cannot be empty" };
    } else if (title.length > 15) {
      err = { category: "Name is too long" };
    }

    setError(err);
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    !Object.values(isValid).length && addSubCategory(title, category);
  };

  return (
    <div className="bg-white p-4 w-full sm:w-1/2 m-auto mt-4 shadow-lg rounded-lg">
      <p className="font-sans text-lg font-medium mb-4">
        Create a new Collection!
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            placeholder="Collection's name"
            name="category"
            type="text"
            value={title}
            autoComplete="off"
            className="my-input"
            onChange={handleChange}
          />
          <button className="my-button" type="submit">
            Create
          </button>
        </div>
        {error.category && (
          <p id="category-error" className="text-sm text-red-600">
            {error.category}
          </p>
        )}
      </form>
    </div>
  );
};

export default SubCategoryForm;
