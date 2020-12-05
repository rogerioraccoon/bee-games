import styled from "styled-components";

export const Products = styled.table`
  width: 100%;
  max-width: 500px;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 50px;
    height: auto;
  }

  td {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const Summary = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: 24px;
  text-align: right;
`;

export const Quantity = styled.td`
  span {
    vertical-align: top;
  }

  svg {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
