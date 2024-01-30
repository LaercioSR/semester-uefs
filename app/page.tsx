"use client";
import { Content, Main, Subtitle, Title } from "./style";
import { semesters } from "./api/db.json";

export default function Home() {
  const today = new Date();
  const daysToEnd = semesters
    .map((semester) =>
      Math.ceil(
        (new Date(semester.end_at).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    )
    .reduce((min, cur) => {
      if (cur > 0 && cur < min) {
        return cur;
      }
      return min;
    }, 999);

  return (
    <Main>
      <Content>
        <Title>{daysToEnd} dias</Title>
        <Subtitle>para o fim do semestre da UEFS</Subtitle>
      </Content>
    </Main>
  );
}
