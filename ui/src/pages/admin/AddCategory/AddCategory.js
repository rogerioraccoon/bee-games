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
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../../../store";

const AddCategory = () => {
  const [category, setCategory] = useState({});
  const [message, setMessage] = useState();
  const history = useHistory();
  const globalState = useContext(store);
  const { state } = globalState;

  function changeField(key, value) {
    const categoryUpdated = { ...category };
    categoryUpdated[key] = value;
    setCategory(categoryUpdated);
  }

  async function insertCategory() {
    const requiredFields = ["title"];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!category[field] || category[field].trim() === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifique todos os campos.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify(category),
    });

    if (response.status === 200) {
      history.push("/admin/categories");
    } else {
      setMessage("Ocorreu um erro inesperado, tente novamente.");
    }
  }

  return (
    <LayoutAdmin>
      <Container>
        <TitlePage>Produtos</TitlePage>
        <Tabs>
          <TabMenu>
            <TabMenuItem to="/admin/products">Itens</TabMenuItem>
            <TabMenuItem to="/admin/categories" active>
              Categorias
            </TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Adicionar Categoria</SubtitlePage>
            <Input
              onChange={(e) => changeField("title", e.target.value)}
              placeholder="Título"
              value={category.title ? category.title : ""}
            />
            <p>{message}</p>
            <Button onClick={insertCategory}>Adicionar</Button>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default AddCategory;
