import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Content, Grid, TitlePage } from "../../styles/common";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}/products`
      );
      const products = await response.json();
      setProducts(products);
    }

    getProducts();
  }, [id]);

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}`
      );
      const category = await response.json();
      setCategory(category);
    }

    getCategory();
  }, [id]);

  function getSlug(name) {
    let slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.toLowerCase().replace(/[ ]/g, "-");
    return slug;
  }

  return (
    <Layout>
      <Content>
        <TitlePage>{category.title}</TitlePage>
        <Grid>
          {products.map((product) => {
            if (product.active) {
              return (
                <ProductCard
                  key={product._id}
                  link={`/p/${getSlug(product.title)}/${product._id}`}
                  title={product.title}
                  price={product.price}
                  imgSrc={`http://localhost:3000${product.image}`}
                />
              );
            } else {
              return <></>;
            }
          })}
        </Grid>
      </Content>
    </Layout>
  );
};

export default Category;
