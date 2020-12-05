import LayoutAdmin from "../../../components/LayoutAdmin";
import {
  Container,
  TitlePage,
  Tabs,
  TabMenu,
  TabContent,
  SubtitlePage,
  TabMenuItem,
  ButtonAdd,
  Table,
} from "../../../styles/common";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { store } from "../../../store";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    getCategories();
  }, []);

  async function handleActiveStatus(id, status, index) {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify({ active: !status }),
    });

    if (response.status === 200) {
      const categoriesUpdated = [...categories];
      categoriesUpdated[index].active = !status;
      setCategories(categoriesUpdated);
      setMessage("Categoria alterada com sucesso.");
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
            <SubtitlePage>Categorias</SubtitlePage>
            <p>{message}</p>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  return (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.title}</td>
                      <td>
                        <Link to={`/admin/categories/edit/${category._id}`}>
                          Editar
                        </Link>
                        <span
                          onClick={() =>
                            handleActiveStatus(
                              category._id,
                              category.active,
                              index
                            )
                          }
                        >
                          {category.active ? "Desativar" : "Ativar"}{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonAdd as={Link} to="/admin/categories/add">
              Adicionar categoria
            </ButtonAdd>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default ListCategories;
