import LayoutAdmin from "../../../components/LayoutAdmin";
import {
  Container,
  TitlePage,
  Tabs,
  TabMenu,
  TabContent,
  SubtitlePage,
  TabMenuItem,
  Input,
  Button,
} from "../../../styles/common";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../../../store";

const AddUser = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState();
  const history = useHistory();
  const globalState = useContext(store);
  const { state } = globalState;

  function changeField(key, value) {
    const userUpdated = { ...user };
    userUpdated[key] = value;
    setUser(userUpdated);
  }

  async function insertUser() {
    const requiredFields = ["name", "email", "phone", "password"];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!user[field] || user[field].trim() === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifique todos os campos.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      history.push("/admin/users");
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
            <SubtitlePage>Adicionar Administrador</SubtitlePage>
            <Input
              onChange={(e) => changeField("name", e.target.value)}
              placeholder="Nome"
              value={user.name ? user.name : ""}
            />
            <Input
              onChange={(e) => changeField("email", e.target.value)}
              placeholder="E-mail"
              value={user.email ? user.email : ""}
            />
            <Input
              onChange={(e) => changeField("phone", e.target.value)}
              placeholder="Telefone"
              value={user.phone ? user.phone : ""}
            />
            <Input
              type="password"
              onChange={(e) => changeField("password", e.target.value)}
              placeholder="Senha"
              value={user.password ? user.password : ""}
            />
            <p>{message}</p>
            <Button onClick={insertUser}>Adicionar</Button>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default AddUser;
