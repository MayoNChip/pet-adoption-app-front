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
  useDisclosure,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { useContext, useMemo } from "react";
import PetContext from "../../context/PetContext";
import { NavLink } from "react-router-dom";
import userContext from "../../context/UserContext";
import ModalSignup from "../ModalSignup";

function UserTable() {
  const { users, userDetails } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUsersListForTable = () => {
    let usersList = [];

    let i = 1;
    users &&
      users.forEach((user) => {
        usersList.push({
          index: i++,
          userName: user?.firstname,
          permission: user?.permission,
          showUser: user?._id,
          //   return <Button>Edit</Button>;
          // },
        });
      });
    return usersList;
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
        Header: "User Name",
        accessor: "userName",
      },
      {
        Header: "User Age",
        accessor: "petAge",
      },
      {
        Header: "Permission",
        accessor: "permission",
      },

      {
        Header: "",
        accessor: "showUser",
        Cell: ({ value }) => (
          <div>
            <Button variant="outline" colorScheme="cyan" shadow="base">
              <NavLink to={`/user/${value}`}>Details</NavLink>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => getUsersListForTable(), [users]);
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
      borderRadius="8px"
    >
      <Table borderRadius="10px" {...getTableProps()}>
        <Thead backgroundColor="cyan.200">
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

export default UserTable;
