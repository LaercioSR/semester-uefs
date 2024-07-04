import styled from "styled-components";

export const Container = styled("table")`
  display: block;
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled("tr")`
  width: 100%;
`;

export const TableHeader = styled("thead")`
  width: 100%;
`;

interface TableHeaderCellProps {
  width?: string;
}

export const TableHeaderCell = styled("th")<TableHeaderCellProps>`
  padding-bottom: 0.5rem;
  min-width: ${(props) => props.width ?? "7.5rem"};
  border-bottom: 0.025rem solid ${(props) => props.theme.secondary};
`;

export const TableBody = styled("tbody")`
  width: 100%;
`;

interface TableBodyCellProps {
  width?: string;
  $align?: string;
}

export const TableBodyCell = styled("td")<TableBodyCellProps>`
  width: ${(props) => props.width ?? "auto"};
  padding: 0.5rem;
  text-align: ${(props) => props.$align ?? "auto"};
  border-bottom: 0.025rem solid ${(props) => props.theme.secondary};

  li {
    margin-top: 0.5rem;
  }
`;
