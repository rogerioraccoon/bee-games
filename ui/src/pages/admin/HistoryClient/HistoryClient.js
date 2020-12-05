import LayoutAdmin from "../../../components/LayoutAdmin";
import {
  Container,
  TitlePage,
  Tabs,
  TabMenu,
  TabContent,
  SubtitlePage,
  TabMenuItem,
} from "../../../styles/common";
import { Transaction, TransactionTitle, Total } from "./styles";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { store } from "../../../store";

const HistoryClient = () => {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(
        `http://localhost:3000/api/clients/${id}/transactions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Beaerer ${state.auth.access_token}`,
          },
        }
      );
      const data = await response.json();
      setTransactions(data);
    }

    getTransactions();
  }, [id, state]);

  return (
    <LayoutAdmin>
      <Container>
        <TitlePage>Usuários</TitlePage>
        <Tabs>
          <TabMenu>
            <TabMenuItem to="/admin/clients" active>
              Clientes
            </TabMenuItem>
            <TabMenuItem to="/admin/users">Administradores</TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Histórico de Compras</SubtitlePage>
            {transactions.map((transaction) => {
              const date = new Date(transaction.date);
              return (
                <Transaction key={transaction._id}>
                  <TransactionTitle>
                    Compra realizada em{" "}
                    {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                  </TransactionTitle>
                  <ul>
                    {transaction.items.map((item) => (
                      <li key={item._id}>{`${item.quantity} ${
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
    </LayoutAdmin>
  );
};

export default HistoryClient;
