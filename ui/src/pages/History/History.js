import Layout from "../../components/Layout";
import {
  Container,
  Tabs,
  TabMenu,
  TabContent,
  SubtitlePage,
  TitlePage,
} from "../../styles/common";
import { MenuItem, TransactionTitle, Transaction, Total } from "./styles";
import { useContext, useEffect, useState } from "react";
import { store } from "../../store";
import { useHistory } from "react-router-dom";

const History = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;
  const user = state.auth;
  const history = useHistory();
  const [transactions, setTransactions] = useState([]);

  function handleLogout() {
    dispatch({ type: "AUTH_LOGOUT" });
    history.push("/");
  }

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch("http://localhost:3000/api/transactions", {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      const data = await response.json();
      setTransactions(data);
    }

    getTransactions();
  }, [user]);

  return (
    <Layout>
      <Container>
        <TitlePage>{user.name}</TitlePage>
        <Tabs>
          <TabMenu>
            <MenuItem to="/profile/account">Minha Conta</MenuItem>
            <MenuItem to="/profile/history" active>
              Histórico de Compras
            </MenuItem>
            <MenuItem as="p" onClick={handleLogout}>
              Sair
            </MenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Histórico de Compras</SubtitlePage>
            {transactions.map((transaction) => {
              const date = new Date(transaction.date);
              return (
                <Transaction>
                  <TransactionTitle>
                    Compra realizada em{" "}
                    {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                  </TransactionTitle>
                  <ul>
                    {transaction.items.map((item) => (
                      <li>{`${item.quantity} ${
                        item.title
                      } - R$ ${item.price.toFixed(2)}`}</li>
                    ))}
                  </ul>
                  <Total>Total: R$ {transaction.total.toFixed(2)}</Total>
                </Transaction>
              );
            })}
          </TabContent>
        </Tabs>
      </Container>
    </Layout>
  );
};

export default History;
