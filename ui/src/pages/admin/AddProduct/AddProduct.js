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
import { useHistory } from "react-router-dom";
import { store } from "../../../store";

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState();
  const history = useHistory();
  const globalState = useContext(store);
  const { state } = globalState;

  function changeField(key, value) {
    const productUpdated = { ...product };
    productUpdated[key] = value;
    setProduct(productUpdated);
  }

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    getCategories();
  }, []);

  async function insertProduct() {
    const requiredFields = [
      "title",
      "description",
      "file",
      "price",
      "stock",
      "category",
    ];
    let valid = true;
    requiredFields.forEach((field) => {
      if (!product[field] || product[field] === "") valid = false;
    });

    if (!valid) {
      setMessage("Por favor, verifique todos os campos.");
      return false;
    }

    const formData = new FormData();
    const fields = Object.keys(product);
    fields.forEach((field) => {
        formData.append(field, product[field]);
    })
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        Authorization: `Beaerer ${state.auth.access_token}`,
      },
      body: formData,
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
            <SubtitlePage>Adicionar Produto</SubtitlePage>
            <Input
              onChange={(e) => changeField("title", e.target.value)}
              placeholder="Título"
              value={product.title ? product.title : ""}
            />
            <Input
              as="textarea"
              onChange={(e) => changeField("description", e.target.value)}
              placeholder="Descrição"
              value={product.description ? product.description : ""}
            />
            <Input
              type="file"
              onChange={(e) => changeField("file", e.target.files[0])}
              placeholder="Imagem"
            />
            <Input
              onChange={(e) => changeField("videoUrl", e.target.value)}
              placeholder="Link Vídeo Gameplay"
              value={product.videoUrl ? product.videoUrl : ""}
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
            <Button onClick={insertProduct}>Adicionar</Button>
          </TabContent>
        </Tabs>
      </Container>
    </LayoutAdmin>
  );
};

export default AddProduct;
