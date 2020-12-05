import { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import logoSrc from "../../images/logo.jpg";
import { store } from "../../store";
import { useLocation } from "react-router-dom";

const Layout = ({ children, className }) => {
  const globalStore = useContext(store);
  const { state } = globalStore;
  const location = useLocation();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    getCategories();
  }, []);

  function getSlug(name) {
    let slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.toLowerCase().replace(/[ ]/g, "-");
    return slug;
  }

  const items = [
    { name: "Home", active: location.pathname === "/", href: "/" },
  ];

  categories.forEach((category) => {
    const slug = `/c/${getSlug(category.title)}/${category._id}`;
    if (category.active) {
      items.push({
        name: category.title,
        active: location.pathname === slug,
        href: slug,
      });
    }
  });

  return (
    <div className={className}>
      <Header
        name="Bee Games"
        items={items}
        logoSrc={logoSrc}
        account={state.auth.access ? { name: state.auth.name, type: state.auth.type } : undefined}
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
