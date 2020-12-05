import { useState, useContext } from "react";
import Layout from "../../components/Layout";
import { TitlePage, SubtitlePage } from "../../styles/common";
import { ContentPage, InputPage, ButtonPage } from "./styles";
import { store } from "../../store";
import { useHistory } from "react-router-dom";

const CreateAccount = () => {
  const globalStore = useContext(store);
  const { state } = globalStore;
  const history = useHistory();

  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeInput(key, value) {
    const userUpdated = { ...user, [key]: value };
    setUser(userUpdated);
  }

  async function registerUser() {
    setMessage("");

    const fields = [
      "name",
      "phone",
      "email",
      "password",
      "addressCep",
      "addressPlace",
      "addressNumber",
      "addressComplement",
      "addressCity",
      "addressState",
    ];
    let valid = true;

    fields.forEach((field) => {
      if (!user[field] || user[field].trim() === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifique se todos os campos são preenchidos.");
      return false;
    }

    if (password !== user["password"]) {
      setMessage("Por favor, verifique sua senha e repetição.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status !== 200) {
      setMessage("Ocorreu um erro inesperado, por favor, tente mais tarde.");
    } else {
      history.push("/login");
    }
  }

  if (state.auth.access) {
    history.push("/");
  }

  return (
    <Layout>
      <ContentPage>
        <TitlePage>Criar sua conta</TitlePage>

        <SubtitlePage>Informações para acesso</SubtitlePage>
        <InputPage
          onChange={(e) => handleChangeInput("name", e.target.value)}
          type="text"
          placeholder="Nome Completo"
        />
        <InputPage
          onChange={(e) => handleChangeInput("phone", e.target.value)}
          type="text"
          placeholder="Telefone"
        />
        <InputPage
          onChange={(e) => handleChangeInput("email", e.target.value)}
          type="text"
          placeholder="E-mail"
        />
        <InputPage
          onChange={(e) => handleChangeInput("password", e.target.value)}
          type="password"
          placeholder="Senha"
        />
        <InputPage
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Repita sua senha"
        />

        <SubtitlePage>Endereço</SubtitlePage>
        <InputPage
          onChange={(e) => handleChangeInput("addressCep", e.target.value)}
          type="text"
          placeholder="CEP"
        />
        <InputPage
          onChange={(e) => handleChangeInput("addressPlace", e.target.value)}
          type="text"
          placeholder="Logradouro"
        />
        <InputPage
          onChange={(e) => handleChangeInput("addressNumber", e.target.value)}
          type="text"
          placeholder="Número"
        />
        <InputPage
          onChange={(e) =>
            handleChangeInput("addressComplement", e.target.value)
          }
          type="text"
          placeholder="Complemento"
        />
        <InputPage
          onChange={(e) => handleChangeInput("addressCity", e.target.value)}
          type="text"
          placeholder="Cidade"
        />
        <InputPage
          onChange={(e) => handleChangeInput("addressState", e.target.value)}
          type="text"
          placeholder="Estado"
        />
        <p>{message}</p>
        <ButtonPage onClick={registerUser}>Criar cadastro</ButtonPage>
      </ContentPage>
    </Layout>
  );
};

export default CreateAccount;
