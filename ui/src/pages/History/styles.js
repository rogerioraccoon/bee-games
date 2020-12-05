import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const TransactionTitle = styled.h3`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
`;

export const Transaction = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  padding-bottom: 10px;
`;

export const Total = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;
