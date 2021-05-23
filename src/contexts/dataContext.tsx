import React, { createContext, useState, useEffect } from "react";
import { data } from "../../data";

export interface IDataProps {
  getList: (title: string, subcategory?: string) => void;
  addSubCategory: (title: string, subCategoryName: string) => void;
  addItem: (form: object, category: string, subcategory: string) => void;
  list: object[];
  dataItem: object[];
}

export const DataContext = createContext<IDataProps>(null);

const DataContextProvider: React.FC = ({ children }) => {
  const dataItemStr = localStorage.getItem("data");
  const [dataItem, setDataItem] = useState(JSON.parse(dataItemStr));

  const [list, setList] = useState([]);

  useEffect(() => {
    if (!dataItem) {
      localStorage.setItem("data", JSON.stringify(data));
      setDataItem(data);
    }
  }, [dataItem]);

  const getList = (title, subcategory) => {
    const categoryList = dataItem.find(
      ({ category }) => category === title
    ).subcategory;

    const list = subcategory
      ? categoryList?.find(({ name }) => name === subcategory).items
      : categoryList;

    setList(list);
  };

  const addSubCategory = (title, subCategoryName) => {
    const newSubCategory = {
      name: title.toLowerCase(),
      items: [],
    };
    const index = dataItem.findIndex(
      ({ category }) => category === subCategoryName
    );
    const copyOfDataItem = [...dataItem];

    copyOfDataItem[index].subcategory.push(newSubCategory);

    setDataItem(copyOfDataItem);

    localStorage.setItem("data", JSON.stringify(copyOfDataItem));
  };

  const addItem = (form, categoryName, subcategoryName) => {
    const newItem = {
      title: form.title,
      price: (form.price * 1).toFixed(2),
    };

    const categoryIndex = dataItem.findIndex(
      ({ category }) => category === categoryName
    );

    const subCategoryIndex = dataItem[categoryIndex].subcategory.findIndex(
      ({ name }) => name === subcategoryName
    );

    const copyOfDataItem = [...dataItem];

    copyOfDataItem[categoryIndex].subcategory[subCategoryIndex].items.push(
      newItem
    );
    setDataItem(copyOfDataItem);

    localStorage.setItem("data", JSON.stringify(copyOfDataItem));
  };

  return (
    <DataContext.Provider
      value={{
        addSubCategory,
        addItem,
        getList,
        list,
        dataItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
