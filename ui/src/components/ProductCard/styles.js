import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Card = styled(Link)`
  margin-bottom: 50px;
  display: block;
  text-decoration: none;

  img {
    max-width: 100%;
    margin: 0 0 10px 0;
  }

  @media (min-width: 425px) {
    margin: 0;
  }
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

export const Price = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
