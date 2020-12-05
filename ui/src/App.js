import "./styles/normalize.css";
import "./styles/typograph.css";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import LoginPage from "./pages/Login";
import CartPage from "./pages/Cart";
import AddressPage from "./pages/Address";
import PaymentPage from "./pages/Payment";
import CreateAccountPage from "./pages/CreateAccount";
import AccountPage from "./pages/Account";
import HistoryPage from "./pages/History";
import { StateProvider } from "./store.js";
import PrivateRoute from "./components/PrivateRoute";
import ListProductsPage from "./pages/admin/ListProducts";
import AddProductPage from "./pages/admin/AddProduct";
import EditProductPage from "./pages/admin/EditProduct";
import ListCategoriesPage from "./pages/admin/ListCategories";
import AddCategoryPage from "./pages/admin/AddCategory";
import EditCategoryPage from "./pages/admin/EditCategory";
import CategoryPage from "./pages/Category";
import ListClientsPage from "./pages/admin/ListClients";
import HistoryClientPage from "./pages/admin/HistoryClient";
import ViewClientPage from "./pages/admin/ViewClient";
import ListUsersPage from "./pages/admin/ListUsers";
import AddUserPage from "./pages/admin/AddUser";
import EditUserPage from "./pages/admin/EditUser";
import LoginAdminPage from "./pages/LoginAdmin";
import ReportSellsPage from "./pages/admin/ReportSells";
import ReportProductsPage from "./pages/admin/ReportProducts";

const theme = {
  colors: {
    primary: "#5A6978",
    second: "#FFBA5C",
  },
};

function App() {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/create-account">
              <CreateAccountPage />
            </Route>
            <Route path="/p/:slug/:id">
              <ProductPage />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <PrivateRoute path="/address">
              <AddressPage />
            </PrivateRoute>
            <PrivateRoute path="/payment">
              <PaymentPage />
            </PrivateRoute>
            <PrivateRoute path="/profile/account">
              <AccountPage />
            </PrivateRoute>
            <PrivateRoute path="/profile/history">
              <HistoryPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/products/add">
              <AddProductPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/products/edit/:id">
              <EditProductPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/products">
              <ListProductsPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/categories/add">
              <AddCategoryPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/categories/edit/:id">
              <EditCategoryPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/categories">
              <ListCategoriesPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/client/history/:id">
              <HistoryClientPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/client/view/:id">
              <ViewClientPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/clients">
              <ListClientsPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/users/add">
              <AddUserPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/user/edit/:id">
              <EditUserPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/users">
              <ListUsersPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/reports/sells">
              <ReportSellsPage />
            </PrivateRoute>
            <PrivateRoute path="/admin/reports/items">
              <ReportProductsPage />
            </PrivateRoute>
            <Route path="/admin">
              <LoginAdminPage />
            </Route>
            <Route path="/c/:slug/:id">
              <CategoryPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
