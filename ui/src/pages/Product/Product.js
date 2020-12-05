import { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import { Button } from "../../styles/common";
import {
  ContentProduct,
  ThumbnailDesktop,
  ThumbnailMobile,
  Title,
  Description,
  ButtonPlay,
  Price,
  PriceDisclaimer,
  Frete,
  InputCEP,
  FreteMessage,
} from "./styles";
import { store } from "../../store";
import { useHistory, useParams } from "react-router-dom";

const Product = () => {
  const globalStore = useContext(store);
  const { dispatch } = globalStore;
  const history = useHistory();

  const [product, setProduct] = useState();
  const [messageFrete, setMessageFrete] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const product = await response.json();
      setProduct(product);
    }

    getProduct();
  }, [id]);

  function handleBuy() {
    const productToCart = {
      id: product._id,
      name: product.title,
      imageSrc: `http://localhost:3000${product.image}`,
      price: product.price,
    };
    dispatch({ type: "ADD_CART_PRODUCT", payload: productToCart });
    history.push("/cart");
  }

  return (
    <Layout>
      {product && (
        <ContentProduct>
          <ThumbnailDesktop src={`http://localhost:3000${product.image}`} />
          <div>
            <Title>{product.title}</Title>
            <ThumbnailMobile src={`http://localhost:3000${product.image}`} />
            <Description>{product.description}</Description>
            {product.videoUrl && <ButtonPlay as="a" href={product.videoUrl} target="__blank">Visualizar gameplay</ButtonPlay>}
            <Price>R$ {product.price.toFixed(2)}</Price>
            <PriceDisclaimer>
              Parcelado em até 6 vezes sem juros
            </PriceDisclaimer>
            <Frete>
              <InputCEP placeholder="Insira seu CEP" />
              <Button onClick={() => setMessageFrete("Frete Grátis")}>
                Calcular Frete
              </Button>
            </Frete>
            <FreteMessage>{messageFrete}</FreteMessage>
            <Button onClick={handleBuy} alternative>
              Comprar
            </Button>
          </div>
        </ContentProduct>
      )}
    </Layout>
  );
};

export default Product;
