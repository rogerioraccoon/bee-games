import { Card, Title, Price } from "./styles";
import { Button } from "../../styles/common";

const ProductCard = ({ link, imgSrc, title, price, className }) => {
  return (
    <Card className={className} to={link}>
      <img src={imgSrc} alt={title} title={title} />
      <Title>{title}</Title>
      <Price>R$ {price.toFixed(2)}</Price>
      <Button alternative>comprar</Button>
    </Card>
  );
};

export default ProductCard;
