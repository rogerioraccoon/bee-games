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
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { store } from "../../../store";

const ListClients = () => {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getClients() {
      const response = await fetch("http://localhost:3000/api/clients", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${state.auth.access_token}`,
        },
      });
      const data = await response.json();
      setClients(data);
    }

    getClients();
  }, [state]);

  async function handleActiveStatus(id, status, index) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify({ active: !status }),
    });

    if (response.status === 200) {
      const clientsUpdated = [...clients];
      clientsUpdated[index].active = !status;
      setClients(clientsUpdated);
      setMessage("Cliente alterado com sucesso.");
    } else {
      setMessage("Ocorreu um erro inesperado, tente novamente.");
    }
  }

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
            <SubtitlePage>Clientes</SubtitlePage>
            <p>{message}</p>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => {
                  return (
                    <tr key={client._id}>
                      <td>{client._id}</td>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>
                        <Link to={`/admin/client/view/${client._id}`}>
                          Visualizar
                        </Link>
                        <Link to={`/admin/client/history/${client._id}`}>
                          Histórico
                        </Link>
                        <span
                          onClick={() =>
                            handleActiveStatus(client._id, client.active, index)
                          }
                        >
                          {client.active ? "Desativar" : "Ativar"}
                        </span>
                      </td>
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

export default ListClients;
