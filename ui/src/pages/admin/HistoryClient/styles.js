import styled from "styled-components";

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
