import { createContext, useEffect, useReducer } from "react";

function getInitialState() {
  const savedState = window.localStorage.getItem("STORE");
  if (!savedState) {
    return {
      auth: {
        access: false,
      },
      cart: {},
    };
  } else {
    return JSON.parse(savedState);
  }
}
const initialState = getInitialState();

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newCart = { ...state.cart };
    switch (action.type) {
      case "AUTH_SUCCESS":
        return {
          ...state,
          auth: { access: true, ...action.payload },
        };
      case "AUTH_LOGOUT":
        return {
          ...state,
          auth: { access: false },
        };
      case "USER_UPDATED":
        return {
          ...state,
          auth: { ...state.auth, ...action.payload },
        };
      case "ADD_CART_PRODUCT":
        if (newCart[`p-${action.payload.id}`]) {
          newCart[`p-${action.payload.id}`].quantity += 1;
        } else {
          newCart[`p-${action.payload.id}`] = action.payload;
          newCart[`p-${action.payload.id}`].quantity = 1;
        }
        return { ...state, cart: newCart };
      case "ADD_QUANTITY_CART_PRODUCT":
        newCart[`p-${action.payload}`].quantity += 1;
        return { ...state, cart: newCart };
      case "REMOVE_QUANTITY_CART_PRODUCT":
        if (newCart[`p-${action.payload}`].quantity - 1 === 0) {
          delete newCart[`p-${action.payload}`];
        } else {
          newCart[`p-${action.payload}`].quantity -= 1;
        }
        return { ...state, cart: newCart };
      case "EMPTY_CART":
        return { ...state, cart: [] };
      default:
        throw new Error();
    }
  }, initialState);

  useEffect(() => {
    window.localStorage.setItem("STORE", JSON.stringify(state));
  }, [state]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
