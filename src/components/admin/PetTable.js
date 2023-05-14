import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  Button,
  Tag,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { useContext, useMemo } from "react";
import PetContext from "../../context/PetContext";
import { NavLink } from "react-router-dom";

function PetTable() {
  const { pets } = useContext(PetContext);

  const getPetListForTable = () => {
    let petList = [];

    const getPetStatus = (petstatus) => {
      switch (petstatus) {
        case "adopted":
          return <Tag colorScheme="green">Adopted</Tag>;
        case "fostered":
          return <Tag colorScheme="orange">Fostered</Tag>;
        case "not-adopted":
          return <Tag colorScheme="red">Waiting for a family</Tag>;
      }
    };

    let i = 1;
    pets &&
      pets.forEach((pet) => {
        petList.push({
          index: i++,
          petName: pet.name,
          petStatus: getPetStatus(pet.petStatus),

          //  === "adopted" ? (
          //     <Tag>Adopted</Tag>
          //   ) : (
          //     <Tag>Fostered</Tag>
          //   ),
          petAge: pet.age,
          edit: pet._id,
          //   return <Button>Edit</Button>;
          // },
        });
      });
    return petList;
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "index",
        isNumeric: true,
        width: 20,
        disableSortBy: true,
        disableFilterBy: true,
      },
      {
        Header: "Pet Name",
        accessor: "petName",
      },
      {
        Header: "Pet Age",
        accessor: "petAge",
      },
      {
        Header: "Pet Status",
        accessor: "petStatus",
      },

      {
        Header: "Edit Pet",
        accessor: "edit",
        Cell: ({ value }) => (
          <div>
            <Button
              variant="outline"
              colorScheme="cyan"
              shadow="base"
              zIndex="0"
            >
              <NavLink to={`/addPet/${value}`}>Edit</NavLink>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => getPetListForTable(), [pets]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Flex
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "0 8px 8px 0 ",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
          borderRadius: "0 8px 8px 0 ",
        },
      }}
      w="100%"
      h="100%"
      overflow="auto"
      borderRadius="10px"
    >
      <Table borderRadius="10px" {...getTableProps()} position="relative">
        <Thead backgroundColor="cyan.200" position="sticky" top="0" zIndex="1">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    fontSize="24px"
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}

export default PetTable;
