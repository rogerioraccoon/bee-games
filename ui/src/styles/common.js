import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;

  @media (min-width: 768px) {
    margin-left: 40px;
    margin-right: 40px;
  }

  @media (min-width: 1024px) {
    margin-left: 60px;
    margin-right: 60px;
  }

  @media (min-width: 1440px) {
    margin-left: calc((100vw - 1300px) / 2);
    margin-right: calc((100vw - 1300px) / 2);
  }
`;

export const Input = styled.input`
  display: block;
  appearance: none;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  max-width: 100%;
  box-sizing: border-box;
  padding: 16px 0 16px 24px;
  margin: 0 0 10px 0;
  font-family: "Roboto", sans-serif;
  outline: none;
  border-radius: 5px;
  width: 100%;
  background-color: #ffffff;
`;

export const Button = styled.button`
  display: block;
  font-size: 16px;
  border: 0;
  background-color: ${(props) =>
    props.alternative
      ? props.theme.colors.second
      : props.border
      ? "#ffffff"
      : props.theme.colors.primary};
  color: ${(props) =>
    props.alternative || props.border ? props.theme.colors.primary : "#ffffff"};
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 16px 24px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  margin: 0 0 10px 0;
  max-width: 320px;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ButtonNext = styled(Button)`
  max-width: 300px;
  margin-left: auto;
`;

export const Grid = styled.div`
  @media (min-width: 425px) {
    display: grid;
    gap: 50px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Content = styled(Container)`
  padding: 25px 0;
`;

export const TitlePage = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin: 25px 0 50px 0;
`;

export const SubtitlePage = styled.h2`
  font-size: 2rem;
  margin: 25px 0;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

export const Tabs = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const TabMenu = styled.div`
  margin: 0 0 25px 0;

  @media (min-width: 768px) {
    padding: 0 50px 0 0;
    border-right: 1px solid ${(props) => props.theme.colors.primary};
    margin: 0;
  }
`;

export const TabContent = styled.div`
  @media (min-width: 768px) {
    margin-left: 50px;
    flex-grow: 1;
  }
`;

export const StepCheckout = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-right: 10px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  @media (min-width: 768px) {
    margin: 20px 0;
  }
`;

export const SummaryCheckout = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 24px;
  text-align: right;
`;

export const TabMenuItem = styled(Link)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-right: 10px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  display: block;

  @media (min-width: 768px) {
    margin: 20px 0;
  }
`;

export const ButtonAdd = styled(Button)`
  max-width: 300px;
  margin: 50px 0 50px auto;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-collapse: collapse;
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 50px;

  th {
    background-color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    color: #ffffff;
    border: 1px solid #ffffff;
  }

  td,
  th {
    padding: 10px;
  }

  tr,
  td {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  img {
    width: 50px;
    height: auto;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    margin: 0 5px;
    display: inline-block;
  }

  span {
    cursor: pointer;
    display: inline-block;
  }
`;
