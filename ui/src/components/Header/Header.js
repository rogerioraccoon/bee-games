import { useState, useContext } from "react";
import {
  Bar,
  Content,
  Logo,
  Menu,
  MenuItem,
  ButtonClose,
  ButtonOpen,
  ButtonAccount,
  ButtonCart,
  Logout,
  MenuRight
} from "./styles";
import { BsX, BsList, BsPeopleCircle, BsBucketFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { store } from "../../store";

const Header = ({ name, logoSrc, items, account, hiddenCart, showLogout = false, className }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const globalStore = useContext(store);
  const { dispatch } = globalStore;

  function handleLogout() {
    dispatch({ type: "AUTH_LOGOUT" });
    history.push("/");
  }

  return (
    <Bar className={className}>
      <Content>
        <Link to="/">
          <Logo src={logoSrc} alt={name} title={name} />
        </Link>
        <Menu active={openMenu}>
          <ButtonClose onClick={() => setOpenMenu(false)}>
            <BsX fill="#ffffff" />
          </ButtonClose>
          {items.map((item) => {
            return (
              <MenuItem key={item.name} $active={item.active} to={item.href}>
                {item.name}
              </MenuItem>
            );
          })}
        </Menu>
        <MenuRight>
          <ButtonAccount to={account ? (account.type === "admin" ? "/admin/users" : "/profile/account") : "/login"}>
            <BsPeopleCircle fill="#ffffff" />
            {account?.name}
          </ButtonAccount>
          {!hiddenCart && (
            <ButtonCart to="/cart">
              <BsBucketFill fill="#ffffff" />
            </ButtonCart>
          )}
          <ButtonOpen onClick={() => setOpenMenu(true)}>
            <BsList fill="#ffffff" />
          </ButtonOpen>
          {showLogout && <Logout onClick={handleLogout}>Sair</Logout>}
        </MenuRight>
      </Content>
    </Bar>
  );
};

export default Header;
