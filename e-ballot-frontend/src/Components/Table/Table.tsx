import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  LinkBox,
  LinkOverlay,
  Box
} from '@chakra-ui/react'
import * as React from 'react'


interface Column {
  Header: string;
  accessor: string;
  Cell?: any | undefined;
}

interface UserProps {
  columns: Array<Column>,
  data: Array<any>
  hover_color?: string
  disable_hover?: boolean
}


export const TableFunction = ({columns, data, hover_color, disable_hover}: UserProps) => {
  let hover_style: any;
  if(hover_color && !disable_hover){
    hover_style = {
      bg: hover_color,
    }
  }
  else{
    hover_style = {
    }
  }
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <LinkBox as={Tr} key={index} _hover={hover_style} onClick={row.run_func} bgColor={row.selected ? hover_color : undefined}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell, row) ?? cell
              let comp: any;
              if(row.link){
                comp =
                  <LinkOverlay href={row.link}>
                    {element}
                  </LinkOverlay>
              }
              else{
                comp = element
              }
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {comp}
                </Td>
              )

            })}

            <Td textAlign="right">
              <Box></Box>
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}
