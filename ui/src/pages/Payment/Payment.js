import Layout from "../../components/Layout";
import {
  Content,
  TitlePage,
  Tabs,
  TabMenu,
  TabContent,
  StepCheckout,
  SubtitlePage,
  SummaryCheckout,
  ButtonNext,
} from "../../styles/common";
import { InputCard } from "./styles";
import { useContext, useState } from "react";
import { store } from "../../store";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;
  const history = useHistory();
  const [message, setMessage] = useState();
  const [data, setData] = useState({});

  function getTotalPrice() {
    const cart = Object.keys(state.cart);
    const total = cart.reduce((total, id) => {
      const product = state.cart[id];
      return total + product.quantity * product.price;
    }, 0);

    return total.toFixed(2);
  }

  async function completeTransaction() {
    const requiredFields = ["name", "number", "date", "code"];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifque se preencheu todos os campos.");
      return false;
    }

    const cart = Object.keys(state.cart);
    const items = cart.map((id) => {
      const product = state.cart[id];
      return {
        title: product.name,
        quantity: product.quantity,
        price: product.price,
        sku: product.id,
      };
    });
    const transaction = { items, total: getTotalPrice() };

    const response = await fetch("http://localhost:3000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${state.auth.access_token}`,
      },
      body: JSON.stringify(transaction),
    });

    if (response.status === 200) {
      dispatch({ type: "EMPTY_CART" });
      history.push("/profile/history");
    } else {
      setMessage("Ocorreu um erro inesperado, por favor, tente mais tarde.");
    }
  }

  const total = getTotalPrice();

  function updatedField(key, value) {
    const updatedData = { ...data };
    updatedData[key] = value;
    setData(updatedData);
  }
  
  return (
    <Layout>
      <Content>
        <TitlePage>Seu carrinho</TitlePage>
        <Tabs>
          <TabMenu>
            <StepCheckout>Produtos</StepCheckout>
            <StepCheckout>Endereço</StepCheckout>
            <StepCheckout active>Pagamento</StepCheckout>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Pagamento</SubtitlePage>
            <InputCard
              onChange={(e) => updatedField("name", e.target.value)}
              placeholder="Nome do Titular"
            />
            <InputCard
              onChange={(e) => updatedField("number", e.target.value)}
              placeholder="Número do Cartão"
            />
            <InputCard
              onChange={(e) => updatedField("date", e.target.value)}
              placeholder="Data de Vencimento"
            />
            <InputCard
              onChange={(e) => updatedField("code", e.target.value)}
              placeholder="Código de Validação"
            />
            <InputCard as="select">
              <option value="1">1 x R$ {total}</option>
              <option value="2">2 x R$ {(total / 2).toFixed(2)}</option>
              <option value="3">3 x R$ {(total / 3).toFixed(2)}</option>
              <option value="4">4 x R$ {(total / 4).toFixed(2)}</option>
              <option value="5">5 x R$ {(total / 5).toFixed(2)}</option>
              <option value="6">6 x R$ {(total / 6).toFixed(2)}</option>
            </InputCard>
            <SummaryCheckout>Total R$ {total}</SummaryCheckout>
            <p>{message}</p>
            <ButtonNext onClick={completeTransaction}>
              Finalizar a compra
            </ButtonNext>
          </TabContent>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Payment;
