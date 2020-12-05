import Layout from "../../components/Layout";
import { Container, TitlePage, Input, Button } from "../../styles/common";
import { Section } from "./styles";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { store } from "../../store";

const LoginAdmin = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const history = useHistory();

  async function handleLogin() {
    const response = await fetch("http://localhost:3000/api/admins/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: "AUTH_SUCCESS", payload: { ...data, type: "admin" } });
      history.push("/admin/products");
    } else {
      setMessage("E-mail e/ou senha incorretos.");
    }
  }

  if (state.auth.access) {
    history.push("/admin/users");
  }

  return (
    <Layout>
      <Section>
        <Container>
          <TitlePage>Login Administrador</TitlePage>
          <p>{message}</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="E-mail"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
          />
          <Button onClick={handleLogin}>Entrar</Button>
        </Container>
      </Section>
    </Layout>
  );
};

export default LoginAdmin;
