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
import PerPageTable from "@/containers/PerPageTable";
import { AdsBanner, AdsBannerStatus } from "@/types/Ads";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";
interface TableProps {
  data: {
    data: AdsBanner[];
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalAds: number;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: number;
  currentPage: number;
}

const BannerAdsTable: React.FC<TableProps> = ({
  data,
  setCurrentPage,
  setPerPage,
  setStateChange,
}) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const deleteBannerMutation = useDynamicMutation();
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
  //delete request
  const deleteBannerSubmitHandler = async () => {
    try {
      await deleteBannerMutation.mutateAsync({
        url: `ads/find/delete/${selectedId}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          setIsConfirmModalOpen(true);
          toast({
            title: "Success!.",
            description: "Ads Deleted Successfully",
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
  const AdsTableColumns: ColumnDef<AdsBanner>[] = [
    {
      accessorKey: "Image",
      header: () => {
        return <Button variant="ghost">Image</Button>;
      },
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.image}
            alt=""
            className="h-10 w-20 rounded-sm object-cover"
          />
        );
      },
    },
    {
      accessorKey: "Title",
      header: () => {
        return <Button variant="ghost">Title</Button>;
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300 line-clamp-1">
            {row?.original?.title}
          </h4>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            start Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {format(new Date(row?.original.startDate), "yyyy-MM-dd")}
          </h4>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {format(new Date(row?.original.endDate), "yyyy-MM-dd")}
          </h4>
        );
      },
    },
    {
      accessorKey: "broker",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            broker
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4 className="font-medium capitalize dark:text-gray-300">
            {row?.original?.broker ? row?.original?.broker?.name : "Inhouse Ad"}
          </h4>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <h4
            className={`font-medium text-xs text-blue-color p-1 px-2 w-fit ${
              row.original?.status === AdsBannerStatus.PENDING
                ? "bg-amber-500/30 text-amber-500"
                : row.original?.status === AdsBannerStatus.APPROVED
                ? "bg-green-500/20 text-green-500"
                : "bg-red-500/20 text-red-500"
            } rounded-md`}
          >
            {row?.original?.status}
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

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/ads/banner/detail/${row.original._id}`)
                }
                className="cursor-pointer"
              >
                View detail
              </DropdownMenuItem>
              {/* {row.original?.status !== AdsBannerStatus.APPROVED && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/ads/banner-detail/${row.original._id}`)
                  }
                  className="cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
              )} */}
              {row.original.isInHouseAd && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedId(row.original._id);
                    setIsConfirmModalOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: data.data,
    columns: AdsTableColumns,
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
            {data.totalAds} Ads
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
        title=" Are you Sure To Delete This Ad?"
        description="This action cannot be undone. This will permanently
                  delete the Ad."
        onClick={deleteBannerSubmitHandler}
        isLoading={deleteBannerMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      />
    </div>
  );
};

export default BannerAdsTable;
