import { useHistory } from "react-router-dom";

interface Card {
  imgSrc: string;
  name: string;
}

const CategoryCard: React.FC<Card> = ({ imgSrc, name }) => {
  const history = useHistory();
  return (
    <div className="card-zoom" onClick={() => history.push(`/${name}`)}>
      <div className="card-zoom-image">
        <img className="object-cover w-full h-full" src={imgSrc} alt={name} />
      </div>
      <p className="card-content uppercase">{name}</p>
    </div>
  );
};

export default CategoryCard;
