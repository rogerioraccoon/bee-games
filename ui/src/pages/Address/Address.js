import Layout from "../../components/Layout";
import {
  Content,
  TitlePage,
  SubtitlePage,
  Tabs,
  TabMenu,
  TabContent,
  Input,
  Button,
  ButtonNext,
  StepCheckout,
  SummaryCheckout,
} from "../../styles/common";
import { Form, Information, Current } from "./styles";
import { Link } from "react-router-dom";
import { store } from "../../store";
import { useContext, useState } from "react";

const Address = () => {
  const globalStore = useContext(store);
  const { state } = globalStore;
  const [address, setAddress] = useState(state.auth.address);
  const [data, setData] = useState({});
  const [message, setMessage] = useState();

  function getTotalPrice() {
    const cart = Object.keys(state.cart);
    const total = cart.reduce((total, id) => {
      const product = state.cart[id];
      return total + product.quantity * product.price;
    }, 0);

    return total.toFixed(2);
  }

  function updateAddressFields(key, value) {
    const updatedData = { ...data };
    updatedData[key] = value;
    setData(updatedData);
  }

  function handleUpdateAddress() {
    setMessage("");
    const requiredFields = ["cep", "place", "number", "city", "state"];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") valid = false;
    });

    if (valid) {
      setAddress(data);
      setData({});
    } else
      setMessage(
        "Por favor, verifque se preencheu todos os campos obrigatórios."
      );
  }

  console.log(data);
  return (
    <Layout>
      <Content>
        <TitlePage>Seu carrinho</TitlePage>
        <Tabs>
          <TabMenu>
            <StepCheckout>Produtos</StepCheckout>
            <StepCheckout active>Endereço</StepCheckout>
            <StepCheckout>Pagamento</StepCheckout>
          </TabMenu>
          <TabContent>
            <Information>
              <div>
                <SubtitlePage>Entrega</SubtitlePage>
                <Current>
                  <p>
                    {address?.place}, {address?.number} <br />
                    {address?.complement} <br />
                    {address?.cep} <br />
                    {address?.city} - {address?.state}
                  </p>
                </Current>
              </div>
              <Form>
                <SubtitlePage>Alterar Endereço</SubtitlePage>
                <Input
                  onChange={(e) => updateAddressFields("cep", e.target.value)}
                  placeholder="CEP*"
                  value={data.cep ? data.cep : ""}
                />
                <Input
                  onChange={(e) => updateAddressFields("place", e.target.value)}
                  placeholder="Logradouro*"
                  value={data.place ? data.place : ""}
                />
                <Input
                  onChange={(e) =>
                    updateAddressFields("number", e.target.value)
                  }
                  placeholder="Número*"
                  value={data.number ? data.number : ""}
                />
                <Input
                  onChange={(e) =>
                    updateAddressFields("complement", e.target.value)
                  }
                  placeholder="Complemento"
                  value={data.complement ? data.complement : ""}
                />
                <Input
                  onChange={(e) => updateAddressFields("city", e.target.value)}
                  placeholder="Cidade*"
                  value={data.city ? data.city : ""}
                />
                <Input
                  onChange={(e) => updateAddressFields("state", e.target.value)}
                  placeholder="Estado*"
                  value={data.state ? data.state : ""}
                />
                <p>{message}</p>
                <Button onClick={handleUpdateAddress}>Alterar Endereço</Button>
              </Form>
            </Information>
            <SummaryCheckout>Total R$ {getTotalPrice()}</SummaryCheckout>
            <ButtonNext as={Link} to="/payment">
              Continuar
            </ButtonNext>
          </TabContent>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Address;
