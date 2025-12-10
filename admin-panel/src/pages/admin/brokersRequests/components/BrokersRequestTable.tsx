import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import useDynamicMutation from "@/hooks/usePostData";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { toast } from "@/hooks/useToast";
import PerPageTable from "@/containers/PerPageTable";
import { BrokerRequest } from "@/types/Broker";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { BrokerRequestStatus } from "@/types/Common";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";

interface TableProps {
  data: {
    data: BrokerRequest[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalRequests: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const BrokersRequestTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
  setStateChange,
}) => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const deleteRequestMutation = useDynamicMutation();
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
  //delete request broker
  const deleteRequestSubmitHandler = async () => {
    try {
      await deleteRequestMutation.mutateAsync({
        url: `agents/find/delete/${selectedId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Request Deleted Successfully",
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
  const AgentTableColumns: ColumnDef<BrokerRequest>[] = [
    {
      accessorKey: "Logo",
      header: () => {
        return <Button variant="ghost">Logo</Button>;
      },
      cell: ({ row }) => {
        return <img src={row?.original?.logo} alt="" className="h-12" />;
      },
    },
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.companyName}
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
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.email}
          </h4>
        );
      },
    },
    {
      accessorKey: "Phone",
      header: () => {
        return <Button variant="ghost">Phone No</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.phone}
          </h4>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return <Button variant="ghost">status</Button>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <h4
              className={`font-medium text-xs text-blue-color p-1 px-2 w-fit ${
                row.original?.status === BrokerRequestStatus.PENDING
                  ? "bg-amber-500/40 text-amber-500"
                  : row.original?.status === BrokerRequestStatus.APPROVED
                  ? "bg-green-500/20 text-green-500"
                  : "bg-red-500/20 text-red-500"
              } rounded-md`}
            >
              {row?.original?.status}
            </h4>
          </div>
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
                <DotsHorizontalIcon className="h-4 w-4 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${
          currentTheme === "dark" || (currentTheme === "dark" && systemTheme)
            ? "text-white bg-secondary-dark-bg"
            : "bg-white"
        }`}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() =>
                  navigate(`/brokers-requests/detail/${row.original?._id}`)
                }
                className="cursor-pointer"
              >
                View detail
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setSelectedId(row.original?._id);
                  setIsConfirmModalOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
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
            {data.totalRequests} Requests
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
        title=" Are you Sure To Delete This Request?"
        description="This action cannot be undone. This will permanently
                  delete the The Request."
        onClick={deleteRequestSubmitHandler}
        isLoading={deleteRequestMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default BrokersRequestTable;
