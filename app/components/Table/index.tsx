import {
  Container,
  TableBody,
  TableBodyCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./styles";

type Header = {
  title: string;
  width?: string;
};

interface TableProps {
  headers: Header[];
  rows: string[][];
  aligns?: string[];
}

export default function Table({ headers, rows, aligns }: TableProps) {
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
              <TableBodyCell key={index} $align={aligns?.at(index)}>
                {cell}
              </TableBodyCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Container>
  );
}
