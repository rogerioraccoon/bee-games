import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Content, Grid, TitlePage } from "../../styles/common";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3000/api/products");
      const products = await response.json();
      setProducts(products);
    }

    getProducts();
  }, []);

  function getSlug(name) {
    let slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.toLowerCase().replace(/[ ]/g, "-");
    return slug;
  }

  return (
    <Layout>
      <Content>
        <TitlePage>Página Inicial</TitlePage>
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

export default Home;
