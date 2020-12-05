import LayoutAdmin from "../../../components/LayoutAdmin";
import {
  Container,
  TitlePage,
  Tabs,
  TabMenu,
  TabContent,
  SubtitlePage,
  TabMenuItem,
  Table,
} from "../../../styles/common";
import { useEffect, useState, useContext } from "react";
import { store } from "../../../store";

const ReportSells = () => {
  const [items, setItems] = useState([]);
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getItems() {
      const response = await fetch("http://localhost:3000/api/reports/sells", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${state.auth.access_token}`,
        },
      });
      const data = await response.json();
      setItems(data);
    }

    getItems();
  }, [state]);

  return (
    <LayoutAdmin>
      <Container>
        <TitlePage>Relatórios</TitlePage>
        <Tabs>
          <TabMenu>
            <TabMenuItem to="/admin/reports/sells" active>
              Vendas
            </TabMenuItem>
            <TabMenuItem to="/admin/reports/items">Produtos</TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Vendas</SubtitlePage>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const date = new Date(item.date);
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{`${date.getDate()}/${
                        date.getMonth() + 1
                      }/${date.getFullYear()}`}</td>
                      <td>{item.quantity}</td>
                      <td>R$ {item.total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default ReportSells;
