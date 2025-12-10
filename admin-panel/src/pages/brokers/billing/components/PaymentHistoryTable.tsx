import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/lib/ui/Dropdown-menu";
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

// import { useNavigate } from "react-router-dom";
import PerPageTable from "@/containers/PerPageTable";
import { Payment } from "@/types/Payment";
import { PaymentStatus } from "@/types/Common";

interface TableProps {
  data: {
    data: Payment[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPayments: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const PaymentHistoryTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
}) => {
  // const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const PropertyTableColumns: ColumnDef<Payment>[] = [
    {
      accessorKey: "Name",
      header: () => {
        return <Button variant="ghost">email address</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize line-clamp-1 dark:text-gray-300">
            {row?.original?.email_address}
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
            {row?.original?.description}
          </h4>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.amount}
          </h4>
        );
      },
    },
    {
      accessorKey: "currency",
      header: () => {
        return <Button variant="ghost">currency</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.currency}
          </h4>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => {
        return <Button variant="ghost">paymentMethod</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.paymentMethod}
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
                row.original?.status === PaymentStatus.PENDING
                  ? "bg-amber-500/40 text-amber-500"
                  : row.original?.status === PaymentStatus.APPROVED
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
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <DotsHorizontalIcon className="h-4 w-4 dark:text-gray-300" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() =>
    //               navigate(`/properties/detail/${row.original?._id}`)
    //             }
    //           >
    //             View detail
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
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
            {data.totalPayments} Billings
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

export default PaymentHistoryTable;
