import Layout from "../../components/Layout";
import {
  Container,
  Tabs,
  TabMenu,
  TabContent,
  Button,
  SubtitlePage,
  TitlePage,
} from "../../styles/common";
import { MenuItem, AccountInput } from "./styles";
import { useContext, useState } from "react";
import { store } from "../../store";
import { useHistory } from "react-router-dom";

const Account = () => {
  const globalStore = useContext(store);
  const { state, dispatch } = globalStore;
  const history = useHistory();
  const user = state.auth;
  const [personalData, setPersonalData] = useState({
    name: user.name,
    phone: user.phone,
  });
  const [adddressData, setAddressData] = useState({ ...user.address });
  const [passwordData, setPasswordData] = useState({});
  const [message, setMessage] = useState();

  function handleLogout() {
    dispatch({ type: "AUTH_LOGOUT" });
    history.push("/");
  }

  function handlePersonalField(key, value) {
    const updatedData = { ...personalData };
    updatedData[key] = value;
    setPersonalData(updatedData);
  }

  function handleAddressField(key, value) {
    const updatedData = { ...adddressData };
    updatedData[key] = value;
    setAddressData(updatedData);
  }

  function handlePasswordField(key, value) {
    const updatedData = { ...passwordData };
    updatedData[key] = value;
    setPasswordData(updatedData);
  }

  async function updatePersonalData() {
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const requiredFiedls = ["name", "phone"];
    let valid = true;
    requiredFiedls.forEach((field) => {
      if (!personalData[field] || personalData[field].trim() === "")
        valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verfique todos os campos obrigatórios.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(personalData),
    });

    if (response.status !== 200) {
      setMessage("Ocorreu um erro inesperado, por favor, tente mais tarde.");
    } else {
      setMessage("Informações alteradas com sucesso.");
      dispatch({ type: "USER_UPDATED", payload: personalData });
    }
  }

  async function updateAddressData() {
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const requiredFiedls = ["cep", "place", "number", "city", "state"];
    let valid = true;
    requiredFiedls.forEach((field) => {
      if (!adddressData[field] || adddressData[field].trim() === "")
        valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verfique todos os campos obrigatórios.");
      return false;
    }

    const fields = Object.keys(adddressData);
    const data = {};
    fields.forEach((field) => {
      data[`address${field.charAt(0).toUpperCase() + field.slice(1)}`] =
        adddressData[field];
    });

    const response = await fetch("http://localhost:3000/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      setMessage("Ocorreu um erro inesperado, por favor, tente mais tarde.");
    } else {
      setMessage("Endereço alterado com sucesso.");
      dispatch({ type: "USER_UPDATED", payload: { address: adddressData } });
    }
  }

  async function updatePasswordData() {
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    const requiredFiedls = ["current", "new", "newRepeat"];
    let valid = true;
    requiredFiedls.forEach((field) => {
      if (!passwordData[field] || passwordData[field].trim() === "")
        valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verfique todos os campos obrigatórios.");
      return false;
    }

    if (passwordData.new !== passwordData.newRepeat) {
      setMessage("Por favor, verfique a nova senha e repetição.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/user/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify({
        current: passwordData.current,
        new: passwordData.new,
      }),
    });

    if (response.status !== 200) {
      setMessage("Por favor, vefique a senha atual.");
    } else {
      setMessage("Senha alterada com sucesso.");
      setPasswordData({});
    }
  }

  return (
    <Layout>
      <Container>
        <TitlePage>{user.name}</TitlePage>
        <Tabs>
          <TabMenu>
            <MenuItem to="/profile/account" active>
              Minha Conta
            </MenuItem>
            <MenuItem to="/profile/history">Histórico de Compras</MenuItem>
            <MenuItem as="p" onClick={handleLogout}>
              Sair
            </MenuItem>
          </TabMenu>
          <TabContent>
            <p>{message}</p>
            <SubtitlePage>Informações Pessoais</SubtitlePage>
            <AccountInput
              onChange={(e) => handlePersonalField("name", e.target.value)}
              value={personalData.name ? personalData.name : ""}
              placeholder=""
            />
            <AccountInput
              onChange={(e) => handlePersonalField("phone", e.target.value)}
              value={personalData.phone ? personalData.phone : ""}
              placeholder=""
            />
            <Button onClick={updatePersonalData}>Alterar</Button>
            <SubtitlePage>Endereço</SubtitlePage>
            <AccountInput
              onChange={(e) => handleAddressField("cep", e.target.value)}
              value={adddressData.cep ? adddressData.cep : ""}
              placeholder="CEP"
            />
            <AccountInput
              onChange={(e) => handleAddressField("place", e.target.value)}
              value={adddressData.place ? adddressData.place : ""}
              placeholder="Logradouro"
            />
            <AccountInput
              onChange={(e) => handleAddressField("number", e.target.value)}
              value={adddressData.number ? adddressData.number : ""}
              placeholder="Número"
            />
            <AccountInput
              onChange={(e) => handleAddressField("complement", e.target.value)}
              value={adddressData.complement ? adddressData.complement : ""}
              placeholder="Complemento"
            />
            <AccountInput
              onChange={(e) => handleAddressField("city", e.target.value)}
              value={adddressData.city ? adddressData.city : ""}
              placeholder="Cidade"
            />
            <AccountInput
              onChange={(e) => handleAddressField("state", e.target.value)}
              value={adddressData.state ? adddressData.state : ""}
              placeholder="Estado"
            />
            <Button onClick={updateAddressData}>Alterar</Button>
            <SubtitlePage>Alterar Senha</SubtitlePage>
            <AccountInput
              onChange={(e) => handlePasswordField("current", e.target.value)}
              placeholder="Senha Atual"
              value={passwordData.current ? passwordData.current : ""}
              type="password"
            />
            <AccountInput
              onChange={(e) => handlePasswordField("new", e.target.value)}
              placeholder="Nova Senha"
              value={passwordData.new ? passwordData.new : ""}
              type="password"
            />
            <AccountInput
              onChange={(e) => handlePasswordField("newRepeat", e.target.value)}
              placeholder="Repita nova senha"
              value={passwordData.newRepeat ? passwordData.newRepeat : ""}
              type="password"
            />
            <Button onClick={updatePasswordData}>Alterar</Button>
          </TabContent>
        </Tabs>
      </Container>
    </Layout>
  );
};

export default Account;
