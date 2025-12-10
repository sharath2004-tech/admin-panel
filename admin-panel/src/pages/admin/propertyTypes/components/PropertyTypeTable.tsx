import * as React from "react";
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
import { PropetyTypeData } from "@/types/Property";

interface TableProps {
  data: {
    data: PropetyTypeData[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalAmenities: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const PropertyTypeTable: React.FC<TableProps> = ({
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

  const AgentTableColumns: ColumnDef<PropetyTypeData>[] = [
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">Name</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-white">
            {row?.original?.name}
          </h4>
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
            {data.totalAmenities} Property Types
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

export default PropertyTypeTable;
