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

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();
  const globalState = useContext(store);
  const { state } = globalState;

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    }

    getProducts();
  }, []);

  async function handleActiveStatus(id, status, index) {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify({ active: !status }),
    });

    if (response.status === 200) {
      const productsUpdated = [...products];
      productsUpdated[index].active = !status;
      setProducts(productsUpdated);
      setMessage("Produto alterado com sucesso.");
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
            <TabMenuItem to="/admin/products" active>
              Itens
            </TabMenuItem>
            <TabMenuItem to="/admin/categories">Categorias</TabMenuItem>
          </TabMenu>
          <TabContent>
            <SubtitlePage>Itens</SubtitlePage>
            <p>{message}</p>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Estoque</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                        <img src={`http://localhost:3000${product.image}`} title={product.title} alt={product.title} />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.stock}</td>
                      <td>R$ {product.price.toFixed(2)}</td>
                      <td>
                        <Link to={`/admin/products/edit/${product._id}`}>
                          Editar
                        </Link>
                        <span
                          onClick={() =>
                            handleActiveStatus(
                              product._id,
                              product.active,
                              index
                            )
                          }
                        >
                          {product.active ? "Desativar" : "Ativar"}{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonAdd as={Link} to="/admin/products/add">
              Adicionar produto
            </ButtonAdd>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default ListProducts;
