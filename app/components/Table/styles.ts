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
  padding: 0.375rem 0.5rem;
  min-width: ${(props) => props.width ?? "7.5rem"};
  border-bottom: 1px solid ${(props) => props.theme.secondary}88;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.85;
`;

export const TableBody = styled("tbody")`
  width: 100%;

  ${TableRow}:nth-child(even) {
    background: ${(props) => props.theme.secondary}0D;
  }
`;

interface TableBodyCellProps {
  width?: string;
  $align?: string;
}

export const TableBodyCell = styled("td")<TableBodyCellProps>`
  width: ${(props) => props.width ?? "auto"};
  padding: 0.5rem;
  text-align: ${(props) => props.$align ?? "auto"};
  border-bottom: 1px solid ${(props) => props.theme.secondary}33;
  line-height: 1.4;

  &:first-child {
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  li {
    margin-top: 0.5rem;
  }
`;
