import { Section, Copyright } from "./styles";
import { Container } from "../../styles/common";

const Footer = ({ className }) => {
  return (
    <Section className={className}>
      <Container>
        <Copyright>© Todos os direitos reservados.</Copyright>
      </Container>
    </Section>
  );
};

export default Footer;
