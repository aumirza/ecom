"use client";

import { useEffect, useState } from "react";
import { Group, Paper, Text } from "@mantine/core";
import {
  DataTable,
  DataTableCellClickHandler,
  DataTableSortStatus,
} from "mantine-datatable";
import { useRouter } from "next/navigation";

export default function ProductsTable({ products }: { products: any }) {
  const router = useRouter();

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  const [sortedProducts, setSortedProducts] = useState(products);

  const handleCellClick: DataTableCellClickHandler<any> = ({
    event,
    record,
    recordIndex,
    column,
    columnIndex,
  }) => {
    if (columnIndex === 0) {
      router.push(`/admin/products/${record.id}/edit`);
    }
  };

  useEffect(() => {
    const sortedProducts = products.sort((a: any, b: any) => {
      if (sortStatus.direction === "asc") {
        return a[sortStatus.columnAccessor] < b[sortStatus.columnAccessor]
          ? -1
          : 1;
      } else {
        return a[sortStatus.columnAccessor] > b[sortStatus.columnAccessor]
          ? -1
          : 1;
      }
    });
    setSortedProducts(sortedProducts);
  }, [sortStatus, products]);

  return (
    <Paper>
      <DataTable
        height={500}
        withBorder
        borderRadius="sm"
        striped
        highlightOnHover
        // provide data
        records={sortedProducts}
        // define columns
        columns={[
          {
            accessor: "name",
            title: "Name",
            textAlignment: "left",
            sortable: true,
            render: (row: any) => (
              <Group>
                <img src={row.image} width={50} height={50} alt={row.name} />
                <Text size="sm" weight={500}>
                  {row.name}
                </Text>
              </Group>
            ),
          },
          {
            accessor: "price",
            title: "Price",
            textAlignment: "left",
            sortable: true,
          },
        ]}
        // execute this callback when a row is clicked
        // onRowClick={({ name, party, bornIn }) =>
        //   alert(
        //     `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}.`
        //   )
        // }
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={products?.length}
        // pagination
        page={1}
        recordsPerPage={10}
        recordsPerPageOptions={[10, 20, 50]}
        onRecordsPerPageChange={(rowsPerPage) =>
          alert(`Rows per page: ${rowsPerPage}`)
        }
        onCellClick={handleCellClick}
        onPageChange={(page) => alert(`Page: ${page}`)}
      />
    </Paper>
  );
}
