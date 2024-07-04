import { Container } from "./style";

interface OverlayProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Overlay({ onClick }: OverlayProps) {
  return <Container onClick={onClick} />;
}
