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
import useDynamicMutation from "@/hooks/usePostData";
import { useAuth } from "@/hooks/useAuthContext";
import { getHeaders } from "@/config/apiConfig";
import { toast } from "@/hooks/useToast";
import { Property } from "@/types/Property";
import { useNavigate } from "react-router-dom";
import PerPageTable from "@/containers/PerPageTable";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { systemTheme } from "@/constants/Color";
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
  setStateChange,
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { currentTheme } = useTheme();
  const headers = getHeaders({ type: "Json", token });
  const deletePropertyMutation = useDynamicMutation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    React.useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  //delete request
  const deletePropertySubmitHandler = async () => {
    try {
      await deletePropertyMutation.mutateAsync({
        url: `property/find/delete/${selectedId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Property Deleted Successfully",
            variant: "success",
          });
          setIsConfirmModalOpen(false);
          setSelectedId(null);
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
  const PropertyTableColumns: ColumnDef<Property>[] = [
    {
      accessorKey: "Image",
      header: () => {
        return <Button variant="ghost">Image</Button>;
      },
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.images[0]?.url}
            alt=""
            className="h-12 w-20 object-cover"
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
          <h4 className="font-medium capitalize line-clamp-1 dark:text-gray-300">
            {row?.original?.name}
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
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.price}
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
      accessorKey: "type",
      header: () => {
        return <Button variant="ghost">type</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.propertyType}
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
          <h4 className="font-medium capitalize dark:text-gray-300">
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
                <DotsHorizontalIcon className="h-4 w-4 dark:text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${
                currentTheme === "dark" ||
                (currentTheme === "dark" && systemTheme)
                  ? "text-white bg-main-dark-bg"
                  : "bg-white"
              }`}>
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/properties/edit/${row.original?._id}`)
                }
              >
                Edit
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
      {/* confim dialog */}
      <ConfirmDialogBox
        title=" Are you Sure To Delete This Property?"
        description="This action cannot be undone. This will permanently
                  delete the Property."
        onClick={deletePropertySubmitHandler}
        isLoading={deletePropertyMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default BrokersPropertyTable;
