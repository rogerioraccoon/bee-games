import { useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import logoSrc from "../../images/logo.jpg";
import { store } from "../../store";
import { useLocation } from "react-router-dom";

const LayoutAdmin = ({ children, className }) => {
  const globalStore = useContext(store);
  const { state } = globalStore;
  const location = useLocation();

  const slug = location.pathname

  const items = [
    { name: "Produtos", active: slug.includes("product") || slug.includes("categor") , href: "/admin/products" },
    { name: "Usuários", active: slug.includes("client") || slug.includes("user"), href: "/admin/users" },
    { name: "Relatórios", active: slug.includes("reports"), href: "/admin/reports/sells" },
  ];
  return (
    <div className={className}>
      <Header
        name="Bee Games"
        items={items}
        logoSrc={logoSrc}
        account={
          state.auth.access
            ? { name: state.auth.name, type: state.auth.type }
            : undefined
        }
        hiddenCart={true}
        showLogout={true}
      />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutAdmin;
