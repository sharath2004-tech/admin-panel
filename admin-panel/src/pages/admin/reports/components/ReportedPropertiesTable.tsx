import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import PerPageTable from "@/containers/PerPageTable";
import { useNavigate } from "react-router-dom";
import { ReportedProperty } from "@/types/Report";
import { formatDistanceToNow } from "date-fns";
import { ReportPropertyAction } from "@/utils/filter.enum";
import { systemTheme } from "@/constants/Color";
import { useTheme } from "@/hooks/useThemeContext";
interface TableProps {
  data: {
    data: ReportedProperty[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalProperties: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const ReportedPropertiesTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
}) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const BrokerTableColumns: ColumnDef<ReportedProperty>[] = [
    {
      accessorKey: "Image",
      header: () => {
        return <Button variant="ghost">Image</Button>;
      },
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.property.images[0].url}
            alt="property image"
            className="h-12 object-cover w-20"
          />
        );
      },
    },
    {
      accessorKey: "ti",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300 line-clamp-1">
            {row?.original?.property.name}
          </h4>
        );
      },
    },
    {
      accessorKey: "reported By",
      header: () => {
        return <Button variant="ghost">reported By</Button>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <img
              src={row?.original?.user.profile_image}
              alt="property image"
              className="h-12 object-cover w-12 rounded-full"
            />
            <h4 className="font-medium capitalize dark:text-gray-300 ">
              {row?.original?.user.firstName +
                " " +
                row?.original?.user.lastName}
            </h4>
          </div>
        );
      },
    },
    {
      accessorKey: "report",
      header: () => {
        return <Button variant="ghost">description</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300 ">
            {row?.original?.discription}
          </h4>
        );
      },
    },
    {
      accessorKey: "reported At",
      header: () => {
        return <Button variant="ghost">reported At</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {formatDistanceToNow(new Date(row?.original?.createdAt))} ago
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
                row.original?.status === ReportPropertyAction.PENDING
                  ? "bg-amber-500/40 text-amber-500"
                  : row.original?.status === ReportPropertyAction.CORRECTED
                  ? "bg-green-500/20 text-green-500"
                  : row.original?.status === ReportPropertyAction.APPROVED
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/reported-properties/detail/${row.original._id}`)
                }
                className="cursor-pointer"
              >
                View detail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: data.data,
    columns: BrokerTableColumns,
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
            {data.totalProperties} Reports
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
    </div>
  );
};

export default ReportedPropertiesTable;
