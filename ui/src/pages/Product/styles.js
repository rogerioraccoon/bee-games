import styled from "styled-components";
import { Content, Button, Input } from "../../styles/common";

export const ThumbnailDesktop = styled.img`
  display: none;
  width: 100%;
  height: auto;
  max-width: 100%;

  @media (min-width: 768px) {
    display: block;
    margin-right: 50px;
    max-width: 30%;
  }
`;

export const ThumbnailMobile = styled.img`
  margin: 0 auto 25px auto;
  display: block;
  max-width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin: 25px 0 25px 0;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

export const Description = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
`;

export const ButtonPlay = styled(Button)`
  margin: 25px 0 0 0;
  max-width: 250px;
  padding: 8px 24px;
  text-transform: none;
`;

export const Price = styled.p`
  font-size: 2rem;
  margin: 0;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  margin: 25px 0 0 0;
`;

export const PriceDisclaimer = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 25px 0;
`;

export const Frete = styled.div`
  display: flex;
  max-width: 400px;
`;

export const InputCEP = styled(Input)`
  margin-right: 20px;
`;

export const ContentProduct = styled(Content)`
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const FreteMessage = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;
