import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";

const LandingPage = lazy(() => import("../components/LandingPage"));
const CardsList = lazy(() => import("../components/CardsList"));

export const routes = [
  {
    path: "/",
    component: LandingPage,
    key: uuidv4(),
    exact: true,
  },
  {
    path: "/:category/subcategory/:subcategory",
    component: CardsList,
    key: uuidv4(),
  },
  {
    path: "/:category",
    component: CardsList,
    key: uuidv4(),
  },
];
