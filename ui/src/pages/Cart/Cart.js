import { useContext } from "react";
import Layout from "../../components/Layout";
import {
  Content,
  TitlePage,
  SubtitlePage,
  ButtonNext,
  Tabs,
  TabMenu,
  TabContent,
  StepCheckout,
  SummaryCheckout,
} from "../../styles/common";
import { Products, Quantity } from "./styles";
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import { store } from "../../store";
import { Link } from "react-router-dom";

const Cart = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;
  const cart = Object.keys(state.cart);

  const handleAddQuantity = (id) => {
    dispatch({ type: "ADD_QUANTITY_CART_PRODUCT", payload: id });
  };

  const handleRemoveQuantity = (id) => {
    dispatch({ type: "REMOVE_QUANTITY_CART_PRODUCT", payload: id });
  };

  const getTotalPrice = () => {
    const total = cart.reduce((total, id) => {
      const product = state.cart[id];
      return total + product.quantity * product.price;
    }, 0);

    return total.toFixed(2);
  };

  console.log(cart);

  return (
    <Layout>
      <Content>
        <TitlePage>Seu carrinho</TitlePage>
        <Tabs>
          <TabMenu>
            <StepCheckout active>Produtos</StepCheckout>
            <StepCheckout>Endereço</StepCheckout>
            <StepCheckout>Pagamento</StepCheckout>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Produtos</SubtitlePage>
            <Products>
              <tbody>
              {cart.map((id) => {
                const product = state.cart[id];
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imageSrc}
                        title={product.name}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <Quantity>
                      <BsFillPlusCircleFill
                        onClick={() => handleAddQuantity(product.id)}
                      />
                      <span>{product.quantity}</span>
                      <BsDashCircleFill
                        onClick={() => handleRemoveQuantity(product.id)}
                      />
                    </Quantity>
                    <td>R$ {product.price.toFixed(2)}</td>
                  </tr>
                );
              })}
              </tbody>
            </Products>
            {cart.length > 0 && (
              <SummaryCheckout>Total: R$ {getTotalPrice()}</SummaryCheckout>
            )}
            {cart.length > 0 && (
              <ButtonNext
                as={Link}
                to={{
                  pathname: state.auth.access ? "/address" : "/login",
                  state: { source: "cart" },
                }}
              >
                Continuar
              </ButtonNext>
            )}
          </TabContent>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Cart;
