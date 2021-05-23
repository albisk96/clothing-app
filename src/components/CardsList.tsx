import React, { useContext, useEffect } from "react";
import { DataContext } from "../contexts/dataContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { menClothesImg, womenClothesImg } from "../../data";

import ItemCard from "./card/ItemCard";
import SubCategoryForm from "./forms/SubCategoryForm";
import ItemsForm from "./forms/ItemsForm";

import { totalPrice } from "../helpers/calculation";

interface ParamTypes {
  category: string;
  subcategory: string;
}

const CardsList = () => {
  const { subcategory, category } = useParams<ParamTypes>();
  const { getList, list } = useContext(DataContext);
  const title = subcategory ? subcategory : `${category}'s Collection`;

  useEffect(() => {
    getList(category, subcategory);
  }, [category]);

  const imageObject = category === "men" ? menClothesImg : womenClothesImg;
  return (
    <>
      <h3 className="title p-4 capitalize">{title}</h3>

      {subcategory ? <ItemsForm /> : <SubCategoryForm />}

      <ul className="my-grid mt-5 mb-10">
        {list.map((val: any) => {
          const price = subcategory ? val.price : totalPrice(val.items);
          return (
            <ItemCard
              name={val.title || val.name}
              imgSrc={imageObject[Math.floor(Math.random() * 11)]}
              categoryName={category}
              price={price}
              isSubCategory={!!subcategory}
              key={uuidv4()}
            />
          );
        })}
      </ul>
    </>
  );
};

export default CardsList;
