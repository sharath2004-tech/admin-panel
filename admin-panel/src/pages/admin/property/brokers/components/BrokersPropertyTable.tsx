import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { Property } from "@/types/Property";
import { useNavigate } from "react-router-dom";
import PerPageTable from "@/containers/PerPageTable";
import { useTheme } from "@/hooks/useThemeContext";

interface TableProps {
  data: {
    data: Property[];
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

const BrokersPropertyTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
}) => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const PropertyTableColumns: ColumnDef<Property>[] = [
    {
      accessorKey: "Image",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.images[0]?.url}
            alt=""
            className="h-12 object-cover w-20"
          />
        );
      },
    },
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize line-clamp-1 dark:text-white">
            {row?.original?.name.slice(0, 35)}...
          </h4>
        );
      },
    },
    {
      accessorKey: "Price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white">
            {row?.original?.price}
          </h4>
        );
      },
    },
    {
      accessorKey: "currency",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            currency
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white">
            {row?.original?.currency}
          </h4>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => {
        return <Button variant="ghost">description</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white  line-clamp-1">
            {row?.original?.description.slice(0, 50)}...
          </h4>
        );
      },
    },
    {
      accessorKey: "Broker",
      header: () => {
        return <Button variant="ghost">Broker</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white">
            {row?.original?.broker?.name}
          </h4>
        );
      },
    },
    {
      accessorKey: "owner",
      header: () => {
        return <Button variant="ghost">owner</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white">
            {row?.original?.owner?.name}
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
                <DotsHorizontalIcon className="h-4 w-4 dark:text-white" />
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
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/properties/detail/${row.original?._id}`)
                }
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
    columns: PropertyTableColumns,
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
                  className="h-24 dark:text-white text-center"
                >
                  No Properties.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <p className="text-sm font-medium dark:text-white">
            {data.totalProperties} Properties
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

export default BrokersPropertyTable;
