import {
  Container,
  TableBody,
  TableBodyCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./styles";

interface TableProps {
  headers: { title: string; width?: string }[];
  rows: string[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <Container>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeaderCell key={index} width={header.width}>
              {header.title}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, index) => (
              <TableBodyCell key={index}>{cell}</TableBodyCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Container>
  );
}
