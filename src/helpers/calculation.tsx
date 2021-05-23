export const totalPrice = (items) => {
  const reducer = (acc, curr) => {
    return +acc + +curr.price;
  };

  const sum = items?.reduce(reducer, 0);
  return sum?.toFixed(2);
};
