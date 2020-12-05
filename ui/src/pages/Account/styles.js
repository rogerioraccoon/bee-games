import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input } from "../../styles/common";

export const MenuItem = styled(Link)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-right: 10px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  display: block;
  cursor: pointer;

  @media (min-width: 768px) {
    margin: 20px 0;
  }
`;

export const AccountInput = styled(Input)`
  max-width: 320px;
`;
