import { useHistory } from "react-router-dom";

interface SubCategoryCardProps {
  imgSrc: string;
  name: string;
  price: number;
  categoryName?: string;
  isSubCategory: boolean;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  imgSrc,
  name,
  price,
  categoryName,
  isSubCategory,
}) => {
  const history = useHistory();

  const redirectTo = () => {
    !isSubCategory && history.push(`/${categoryName}/subcategory/${name}`);
  };

  return (
    <>
      <li
        className={`card-item ${
          !isSubCategory && "hover:opacity-70 cursor-pointer"
        }`}
        onClick={redirectTo}
      >
        <img
          src={imgSrc}
          alt={name}
          className="h-32 sm:h-96 w-full object-cover"
        />
        <div className="m-4 flex justify-between text-center text-lg">
          <span className="text-gray-500 w-1/2 text-left uppercase overflow-ellipsis overflow-hidden">
            {name}
          </span>
          <span className="font-bold text-lg">{price} $</span>
        </div>
      </li>
    </>
  );
};

export default SubCategoryCard;
