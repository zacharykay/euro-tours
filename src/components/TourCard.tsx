import { FC, useState } from "react";
import "../css/tourcard.scss";

interface Props {
  name: string;
  city: string;
  country: string;
  price: number;
  hours: number;
  rating: number;
  guided_tour: boolean;
  group_size: string;
  entrance_fees_included: boolean;
  description: string;
  image_url: string;
  image_alt: string;
}

const ProductCard: FC<Props> = (tour) => {
  const [ showInfo, setShowInfo ] = useState(false);

  const {
    name,
    city,
    country,
    price,
    hours,
    rating,
    guided_tour,
    group_size,
    entrance_fees_included,
    description,
    image_url,
    image_alt,
  } = tour;

  return (
    <div className="card">
      <div className="card-heading">
        <h3>{name}</h3>
      </div>
      <div className="basic-info">
        <h4>${price / 100}</h4>
        <h4>
          {hours} Hours | {rating % 1 === 0 ? `${rating}.0` : rating}&#11088;
        </h4>
      </div>

      <h4>
        {city}, {country}
      </h4>

      <img className="card-image" src={image_url} alt={image_alt} />
      <p className={showInfo ? "info" : ""}>{description}</p>
      <button
        onClick={() => {
          setShowInfo(!showInfo);
        }}
      >
        See More...
      </button>
    </div>
  );
};

export default ProductCard;
