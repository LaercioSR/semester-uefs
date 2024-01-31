import { Content, LinkFooter, Text } from "./style";
import HeartIcon from "@assets/icons/heart.svg";

export default function Footer() {
  return (
    <Content>
      <Text>Feito com</Text>
      <HeartIcon />
      <Text>por</Text>
      <LinkFooter href="https://laerciorios.com" target="_blanket">
        Laercio Rios
      </LinkFooter>
    </Content>
  );
}
