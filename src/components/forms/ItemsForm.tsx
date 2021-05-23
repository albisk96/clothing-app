import { useState, useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import { useParams } from "react-router-dom";

import Input from "./Input";

interface ParamTypes {
  category: string;
  subcategory: string;
}

interface ErrorTypes {
  title?: string;
  price?: string;
}

interface IForm {
  title: string;
  price: string;
}

const validation = (form: IForm) => {
  const errorStatus = {};

  if (!form.title) {
    errorStatus["title"] = "Title cannot be empty";
  }

  if (!form.price) {
    errorStatus["price"] = "Price cannot be empty";
  }

  if (10000 < +form.price || +form.price < 0) {
    errorStatus["price"] = "Incorrect price";
  }

  if (form.title.length > 25) {
    errorStatus["title"] = "Title is too long";
  }

  return errorStatus;
};

const ItemsForm = () => {
  const { addItem } = useContext(DataContext);
  const { category, subcategory } = useParams<ParamTypes>();
  const [error, setError] = useState<ErrorTypes>({});

  const [form, setForm] = useState({
    title: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes("price") && !/^-?\d*\.?\d*$/.test(value)) {
      return;
    } else {
      setForm({ ...form, [name]: value });
    }

    delete error[name];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkErrors = validation(form);

    const isErrorExist = !!Object.values(checkErrors).length;

    if (isErrorExist) {
      setError(checkErrors);
    } else {
      addItem(form, category, subcategory);
    }
  };

  return (
    <div className="bg-white p-4 w-full sm:w-1/2 m-auto mt-4 shadow-lg rounded-lg">
      <p className="font-sans text-lg font-medium mb-4">Create a new Item!</p>
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="title"
          name="title"
          handleChange={handleChange}
          value={form.title}
          error={error.title}
          border
        />
        <Input
          label="Price"
          placeholder="0.99"
          name="price"
          value={form.price}
          border
          error={error.price}
          handleChange={handleChange}
        />
        <button className="my-button mt-4" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemsForm;
