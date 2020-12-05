import styled from "styled-components";
import { Container } from "../../styles/common";
import { Link } from "react-router-dom";

export const Bar = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 5px 0;

  @media (min-width: 1024px) {
    padding: 10px 0;
  }
`;

export const Content = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 75px;
  height: auto;

  @media (min-width: 1024px) {
    width: 150px;
  }
`;

export const Menu = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  transform: ${(props) =>
    props.active ? "translateX(0)" : "translateX(100vw)"};
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.25s;

  @media (min-width: 1024px) {
    position: static;
    width: auto;
    height: auto;
    display: flex;
    min-height: auto;
    transform: translateX(0);
    padding: 0;
  }
`;

export const MenuItem = styled(Link)`
  color: #ffffff;
  padding: 10px 0;
  margin: 10px 0;
  display: block;
  text-decoration: none;
  font-size: 16px;

  @media (min-width: 1024px) {
    padding: 10px;
    margin: 0 5px;
    font-size: 18px;

    background-color: ${(props) =>
      props.$active ? props.theme.colors.second : "transparent"};
    color: ${(props) =>
      props.$active ? props.theme.colors.primary : "#ffffff"};
    border-radius: 5px;
  }
`;

export const ButtonClose = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;

  @media (min-width: 1024px) {
    display: none;
    font-size: 18px;
  }
`;

export const ButtonOpen = styled.button`
  border: 0;
  background-color: transparent;
  margin-left: 10px;
  font-size: 16px;

  @media (min-width: 1024px) {
    display: none;
    font-size: 18px;
  }
`;

export const ButtonAccount = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  font-size: 16px;

  svg {
    margin-right: 5px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const ButtonCart = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
  font-size: 16px;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const Logout = styled.div`
  display: inline-block;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
`;

export const MenuRight = styled.div`
  display: flex;
  align-items: center;
`;
