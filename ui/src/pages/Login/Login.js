import Layout from "../../components/Layout";
import { Container, TitlePage, Input, Button } from "../../styles/common";
import { Section, Subtitle } from "./styles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { store } from "../../store";

const Login = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const location = useLocation();
  const history = useHistory();

  async function handleLogin() {
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      if (location.state?.source === "cart") {
        history.push("/address");
      } else {
        history.push("/profile/account");
      }
    } else {
      setMessage("E-mail e/ou senha incorretos.");
    }
  }

  if (state.auth.access) {
    history.push("/");
  }

  return (
    <Layout>
      <Section>
        <Container>
          <TitlePage>Login</TitlePage>
          <Subtitle>
            Entre na sua conta para fazer compras mais <br /> rápido e
            visualizar o seu histórico.
          </Subtitle>
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
          <Button as={Link} to="/create-account">
            Criar sua conta
          </Button>
        </Container>
      </Section>
    </Layout>
  );
};

export default Login;
