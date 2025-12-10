import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

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
import { PackageStatus } from "@/types/Common";
import { PackageData } from "@/types/Package";

interface TableProps {
  data: {
    data: PackageData[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPackages: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const MyPackagesTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const PropertyTableColumns: ColumnDef<PackageData>[] = [
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize line-clamp-1 dark:text-gray-300">
            {row?.original?.package?.name}
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
          <h4 className="font-medium capitalize dark:text-gray-300  line-clamp-1">
            {row?.original?.package.description}
          </h4>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.package?.price}
          </h4>
        );
      },
    },
    {
      accessorKey: "max listing",
      header: () => {
        return <Button variant="ghost">max Listing Allowed</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.package?.maxListingsAllowed}
          </h4>
        );
      },
    },
    {
      accessorKey: "remining",
      header: () => {
        return <Button variant="ghost">remining</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.package?.remining}
          </h4>
        );
      },
    },
    {
      accessorKey: "active",
      header: () => {
        return <Button variant="ghost">is Active</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.isActive ? "Active" : "Wating"}
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
                row.original?.status === PackageStatus.PENDING
                  ? "bg-amber-500/40 text-amber-500"
                  : row.original?.status === PackageStatus.APPROVED
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
  ];
  const table = useReactTable({
    data: data.data,
    columns: PropertyTableColumns,
    // pageCount: data.totalPages,
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
  console.log(
    "🚀 ~ file: PaymentHistoryTable.tsx ~ line 257 ~ PaymentHistoryTable ~ table",
    table.getPaginationRowModel()
  );
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
            {data.totalPackages} Packages
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

export default MyPackagesTable;
