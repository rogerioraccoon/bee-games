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
  ButtonAdd,
} from "../../../styles/common";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { store } from "../../../store";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://localhost:3000/api/admins", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${state.auth.access_token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    }

    getUsers();
  }, [state]);

  async function handleActiveStatus(id, status, index) {
    const response = await fetch(`http://localhost:3000/api/admins/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify({ active: !status }),
    });

    if (response.status === 200) {
      const usersUpdated = [...users];
      usersUpdated[index].active = !status;
      setUsers(usersUpdated);
      setMessage("Usuário alterado com sucesso.");
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
            <TabMenuItem to="/admin/clients">Clientes</TabMenuItem>
            <TabMenuItem to="/admin/users" active>
              Administradores
            </TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Administradores</SubtitlePage>
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
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Link to={`/admin/user/edit/${user._id}`}>Editar</Link>
                        <span
                          onClick={() =>
                            handleActiveStatus(user._id, user.active, index)
                          }
                        >
                          {user.active ? "Desativar" : "Ativar"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonAdd as={Link} to="/admin/users/add">
              Adicionar administrador
            </ButtonAdd>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default ListUsers;
