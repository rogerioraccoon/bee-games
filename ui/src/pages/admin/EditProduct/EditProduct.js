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
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { store } from "../../../store";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState();
  const history = useHistory();
  const { id } = useParams();
  const globalState = useContext(store);
  const { state } = globalState;

  function changeField(key, value) {
    const productUpdated = { ...product };
    productUpdated[key] = value;
    setProduct(productUpdated);
  }

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [id]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    getCategories();
  }, []);


  async function updateProduct() {
    const requiredFields = ["title", "description", "price", "stock", "category"];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!product[field] || product[field] === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifique todos os campos.");
      return false;
    }

    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: JSON.stringify(product),
    });

    if (response.status === 200) {
      history.push("/admin/products");
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
            <SubtitlePage>Editar Produto</SubtitlePage>
            <Input
              onChange={(e) => changeField("title", e.target.value)}
              placeholder="Título"
              value={product.title ? product.title : ""}
            />
            <Input
              onChange={(e) => changeField("videoUrl", e.target.value)}
              placeholder="Link Vídeo Gameplay"
              value={product.videoUrl ? product.videoUrl : ""}
            />
            <Input
              as="textarea"
              onChange={(e) => changeField("description", e.target.value)}
              placeholder="Descrição"
              value={product.description ? product.description : ""}
            />
            <Input
              type="number"
              onChange={(e) => changeField("price", e.target.value)}
              placeholder="Preço"
              value={product.price ? product.price : ""}
            />
            <Input
              type="number"
              onChange={(e) => changeField("stock", e.target.value)}
              placeholder="Estoque"
              value={product.stock ? product.stock : ""}
            />
            <Input
              onChange={(e) => changeField("category", e.target.value)}
              value={product.category ? product.category : ""}
              as="select"
            >
              <option value="">Categoria</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                );
              })}
            </Input>
            <p>{message}</p>
            <Button onClick={updateProduct}>Editar</Button>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default EditProduct;
