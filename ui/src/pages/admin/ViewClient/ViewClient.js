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
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Information } from "./styles";
import { store } from "../../../store";

const ViewClient = () => {
  const [client, setClient] = useState({});
  const { id } = useParams();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getClient() {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${state.auth.access_token}`,
        },
      });
      const data = await response.json();
      setClient(data);
    }

    getClient();
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
            <SubtitlePage>Informações Pessoais</SubtitlePage>
            <Information>
              <p>{client.name}</p>
              <p>{client.phone}</p>
              <p>{client.email}</p>
            </Information>
            <SubtitlePage>Endereço</SubtitlePage>
            <Information>
              <p>
                {client.addressPlace}, {client.addressNumber}
              </p>
              {client.addressComplement && <p>{client.addressComplement}</p>}
              <p>{client.addressCep}</p>
              <p>
                {client.addressCity} - {client.addressState}
              </p>
            </Information>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default ViewClient;
