import React, { useContext } from "react";

import CategoryCard from "./card/CategoryCard";
import { DataContext } from "../contexts/dataContext";

const LandingPage = () => {
  const { dataItem } = useContext(DataContext);

  return (
    <>
      <h3 className="title p-4">Welcome!</h3>
      <div className="sm:flex text-center justify-center">
        {dataItem.map((value: any, idx) => (
          <React.Fragment key={idx}>
            <CategoryCard imgSrc={value.imgUrl} name={value.category} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
