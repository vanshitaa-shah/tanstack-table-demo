/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type {
  ColumnDef,
  ColumnSort,
  ExpandedState,
} from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Popover, Tag, Typography } from "antd";
import { FilterFilled } from "@ant-design/icons";

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columnOrder = useSelector((state: RootState) => state.columns.order);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  function createHeader(title: string, filter?: ReactNode) {
    return (
      <>
        <Typography.Text strong>{title}</Typography.Text>
        {/*Uncomment if on headers of table, all cell collapse expand functionality is needed  */}
        {/* <button onClick={table.getToggleAllRowsExpandedHandler()} type="button">
          {table.getIsAllRowsExpanded() ? "👇" : "👉"}
        </button> */}
        {!!filter && (
          <Popover
            trigger="click"
            placement="bottomRight"
            arrow={false}
            content={filter}
          >
            <button className="filter-button" type="button">
              <FilterFilled />
            </button>
          </Popover>
        )}
      </>
    );
  }
  
  const allColumns: ColumnDef<any>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: () => createHeader("ID"),
      cell: (info) => <Tag>{info.getValue() as string}</Tag>,
      maxSize: 100,
      enableSorting: true,
    },
    {
      id: "organization",
      accessorKey: "organization",
      header: () => createHeader("Organizations"),
      cell: (info) => <Tag>{info.getValue() as string}</Tag>,
      enableSorting: true,
    },
    {
      id: "parentOrganization",
      accessorKey: "parentOrganization",
      header: () => createHeader("Parent Oraganization"),
      cell: ({ row, getValue }) => {
        const extraInfo = row.original.extraInfo;
    
        return (
          <div>
            <div>
              <div />{" "}
              {row.getCanExpand() && (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? "👇" : "👉"}
                </button>
              )}
              {getValue<boolean>()}

                {/* Additional information for expanded row */}
              <div>
                {row.getIsExpanded() && (
                  <div className="p-2 mt-2 bg-gray-50 rounded">
                    <Typography.Text strong>Founded Year: </Typography.Text>
                    <Tag>{extraInfo.foundedYear}</Tag>
                    <br />
                    <Typography.Text strong>CEO: </Typography.Text>
                    <Tag>{extraInfo.CEO}</Tag>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: "decisions",
      accessorKey: "decisions",
      header: () => createHeader("Decisions"),
      cell: (info) => <Tag>{info.getValue() as number}</Tag>,
    },
    {
      id: "delegations",
      accessorKey: "delegations",
      header: () => createHeader("Delegations"),
      cell: (info) => <Tag>{info.getValue() as number}</Tag>,
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => createHeader("Status"),
      cell: (info) => {
        const value = info.getValue() as string;
        return value === "Active" ? (
          <Tag color="success">{value}</Tag>
        ) : (
          <Tag color="warning">{value}</Tag>
        );
      },
      enableSorting: true,
    },

    {
      id: "actions",
      header: () => createHeader("Actions"),
      cell: () => <>actions</>,
      maxSize: 150,
    },
  ];

  // Arrange columns based on Redux state order
  const columns = useMemo(() => {
    const filteredColumns = columnOrder.map((key) => {
      if (key === "select" || key === "actions") return null;
      return allColumns.find((col) => col.id === key);
    });

    // Return the new columns array, where "Select" is first and "Actions" is last
    return [
      {
        id: "select",
        header: () => createHeader("Select"),
        cell: () => <>static</>,
        maxSize: 50,
      },
      ...filteredColumns,
      allColumns.find((col) => col.id === "actions"),
    ] as ColumnDef<any>[];
  }, [columnOrder]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: (row) => row.original.isExpandable,
    // getRowCanExpand: (row) => {
    //   if (row.original.isExpandable) return true;
    //   return false;
    // },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { expanded, sorting },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-gray-900 border-b"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DataTable;
