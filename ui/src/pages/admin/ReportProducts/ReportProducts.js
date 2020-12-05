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

const ReportProducts = () => {
  const [items, setItems] = useState([]);
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getItems() {
      const response = await fetch(
        "http://localhost:3000/api/reports/sells-product",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Beaerer ${state.auth.access_token}`,
          },
        }
      );
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
            <TabMenuItem to="/admin/reports/sells">Vendas</TabMenuItem>
            <TabMenuItem to="/admin/reports/items" active>
              Produtos
            </TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Produtos</SubtitlePage>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Quantidade Vendida</th>
                  <th>Valor Arrecadado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>R$ {item.price.toFixed(2)}</td>
                      <td>{item.stock}</td>
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

export default ReportProducts;
