import { totalPrice } from "../helpers/calculation";

describe("Teisingai apskaičiuojama prekių suma subkategorijai", () => {
  const items = [
    { price: 153.84, title: "" },
    { price: 185, title: "" },
    { price: 223, title: "" },
    { price: 11.5, title: "" },
    { price: 7.52, title: "" },
    { price: 7.52, title: "" },
    { price: 0.0, title: "" },
  ];

  test("Teisingai apskaičiuojama prekių suma", () => {
    expect(totalPrice(items)).toBe("588.38");
  });
});
