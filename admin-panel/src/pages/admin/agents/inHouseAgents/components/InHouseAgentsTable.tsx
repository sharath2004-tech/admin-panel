import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/ui/Dropdown-menu";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/lib/ui/TableButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/Table";
import { Agent } from "@/types/Agent";
import useDynamicMutation from "@/hooks/usePostData";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { toast } from "@/hooks/useToast";
import PerPageTable from "@/containers/PerPageTable";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { useTheme } from "@/hooks/useThemeContext";

interface TableProps {
  data: {
    data: Agent[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalAgents: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const InHouseAgentsTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
  setStateChange,
}) => {
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const deleteAgentMutation = useDynamicMutation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  //delete request agent
  const deleteAgentSubmitHandler = async () => {
    try {
      await deleteAgentMutation.mutateAsync({
        url: `agents/find/delete/${selectedId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Agent Deleted Successfully",
            variant: "success",
          });
          setStateChange((prev) => !prev);
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const AgentTableColumns: ColumnDef<Agent>[] = [
    {
      accessorKey: "Image",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.user?.profile_image}
            alt="Profile Image"
            className="h-12 w-12 rounded-full"
          />
        );
      },
    },
    {
      accessorKey: "First Name",
      header: () => {
        return <Button variant="ghost">First Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.user?.firstName}
          </h4>
        );
      },
    },
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">Last Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.user?.lastName}
          </h4>
        );
      },
    },
    {
      accessorKey: "Email",
      header: () => {
        return <Button variant="ghost">Email</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium dark:text-gray-300">
            {row?.original?.user?.email}
          </h4>
        );
      },
    },
    {
      accessorKey: "Phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone No
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.user?.phone}
          </h4>
        );
      },
    },
    {
      accessorKey: "whatsappNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            whatsapp Number
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.whatsappNumber}
          </h4>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4 dark:text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={`${
                currentTheme === "dark" ||
                (currentTheme === "dark" && systemTheme)
                  ? "text-white bg-main-dark-bg"
                  : "bg-white"
              }`}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedId(row.original?._id);
                  setIsConfirmModalOpen(true);
                }}
                className="cursor-pointer"
              >
                Delete Agent
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                View detail
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: data.data,
    columns: AgentTableColumns,
    pageCount: data.totalPages,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full ">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  //   colSpan={columns.length}
                  className="h-24 text-center dark:text-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <p className="text-sm font-medium dark:text-white">
            {data.totalAgents} Agents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <PerPageTable setPerPage={setPerPage} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              setCurrentPage((prev) => prev - 1);
            }}
            disabled={!data.hasPrevPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={!data.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
      {/* confim dialog */}
      <ConfirmDialogBox
        title=" Are you Sure To Delete This Agent?"
        description="This will chnage the properties he assigned changed by you."
        onClick={deleteAgentSubmitHandler}
        isLoading={deleteAgentMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default InHouseAgentsTable;
