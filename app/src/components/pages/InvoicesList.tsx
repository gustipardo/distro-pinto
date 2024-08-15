import { useEffect, useState } from "react";
import { getInvoices } from "@/services/getInvoices";
import { DateRangePicker } from "../reusable/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDateToYYYYMMDD, formatDateToDDMMYYYY } from "@/services/formatDate";
import { Label } from "@/components/ui/label";
import { SelectEntities } from "../reusable/SelectEntities";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "../ui/card";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon } from "lucide-react";
import { formatNumber } from "@/services/formatNumber";
import { InvoiceQueryParams } from "@/commons/Interfaces";

export type Payment = {
  id: number
  date: string
  client: string
  amount: number
  cash: number
  mp_vani: number
  mp_gus: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||(table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    enableHiding: false,
    cell: ({ row }) => <div className="text-left">{formatDateToDDMMYYYY(row.original.date)}</div>
  },
  {
    accessorKey: "client",
    enableHiding: false,
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Entidad
          <CaretSortIcon className="ml-2 h-4 w-4" />  
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-left">{row.original.client}</div>
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => <div className="text-right">${formatNumber(row.original.amount)}</div>
  },
  {
    accessorKey: "efectivo",
    header: () => <div className="text-right">Efectivo</div>,
    cell: ({ row }) => <div className="text-right">${formatNumber(row.original.cash)}</div>
  },
  {
    accessorKey: "mp_vani",
    header: () => <div className="text-right">Mp Vani</div>,
    cell: ({ row }) => <div className="text-right">${formatNumber(row.original.mp_vani)}</div>
  },
  {
    accessorKey: "mp_gus",
    header: () => <div className="text-right">Mp Gus</div>,
    cell: ({ row }) => <div className="text-right">${formatNumber(row.original.mp_gus)}</div>
  },
]


export const InvoicesList = () => {
  const [invoices, setInvoices] = useState<Payment[]>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [values, setValues] = useState<InvoiceQueryParams>({ range: { from: '', to: '' }, isPending: true, isPaid: true, isClient: true, entityId: '' })
  
  const table = useReactTable({
    data: invoices,
    columns,
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
  })


/*   useEffect(() => {
    console.log("values", values);
  }, [values]); */

  useEffect(() => {
    handleDateRangeUpdate({ range: { from: new Date(), to: new Date() } });
  }, []);

  const handleDateRangeUpdate = async (values: { range: any}) => {
    /* console.log("From:", values.range.from, "To:", values.range.to); */
    const from = formatDateToYYYYMMDD(values.range.from);
    const to = values.range.to ? formatDateToYYYYMMDD(values.range.to) : from;
    setValues((prevValues) => ({ ...prevValues, range: { from, to } }));
  };

  const handleEntitySelect = (selectedEntity: { id: string; name: string }) => {
    console.log("Entidad seleccionada:", selectedEntity);
    setValues((prevValues) => ({ ...prevValues, entityId: selectedEntity.id }));
  };
  
  const handleClick = async () => {
    try {
      const data = await getInvoices(values);
      console.log("data", data);
      setInvoices(data);
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  }

  const handleTabChange = (value: string) => {
    setValues((prevValues) => ({ ...prevValues, isClient: value === "client", entityId: '' }));
  }


  const totals = invoices.reduce(
    (acc, invoice) => {
      acc.total += invoice.amount;
      acc.cash += invoice.cash;
      acc.mpVani += invoice.mp_vani;
      acc.mpGus += invoice.mp_gus;
      return acc;
    },
    { total: 0, cash: 0, mpVani: 0, mpGus: 0 }
  );

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Listado de Facturas</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-2 h-fit">
  <Card className="flex flex-col md:flex-row md:items-start md:space-x-4 w-full p-4">
    {/* Columna Izquierda */}
    <div className="flex flex-col md:w-1/2 space-y-4">
      <Label className="bg-gray-100 text-gray-600 p-2 rounded-md w-full h-10 flex items-center justify-center">
        Seleccione un rango de fechas
      </Label>
      <DateRangePicker
        locale="es-AR"
        showCompare={false}
        onUpdate={handleDateRangeUpdate}
      />
      <Tabs
        defaultValue="client"
        className="w-full flex flex-col"
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="client">Clientes</TabsTrigger>
          <TabsTrigger value="supplier">Proveedores</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <Label className="text-sm text-left block text-gray-600">Filtrar por un cliente:</Label>
          <SelectEntities isCustomer={true} onSelectEntity={handleEntitySelect} />
        </TabsContent>
        <TabsContent value="supplier">
          <Label className="text-sm text-left block text-gray-600">Filtrar por un proveedor:</Label>
          <SelectEntities isCustomer={false} onSelectEntity={handleEntitySelect} />
        </TabsContent>
      </Tabs>
    </div>

    {/* Columna Derecha */}
    <div className="flex flex-col md:w-1/2 space-y-2">
    <Card className="h-32 w-full p-4 hidden md:block">
      
    </Card>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="paid"
          checked={values.isPaid}
          onCheckedChange={() => setValues((prevValues) => ({
            ...prevValues,
            isPaid: !prevValues.isPaid
          }))}
        />
        <label
          htmlFor="paid"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Pagadas
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="pending"
          checked={values.isPending}
          onCheckedChange={() => setValues((prevValues) => ({
            ...prevValues,
            isPending: !prevValues.isPending
          }))}
        />
        <label
          htmlFor="pending"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Pendientes
        </label>
      </div>
      <Button className="w-full" onClick={handleClick}>Consultar facturas</Button>
    </div>
  </Card>
</div>


  <div className="flex flex-col md:flex-row gap-2 mb-2 p-2">
    <Card className="w-full flex flex-col justify-center hidden md:block">
        Acciones
    </Card>
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
    </DropdownMenu>
  </div>
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
                  )
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
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
          
        </TableBody>
        <TableFooter>
          <TableRow className="text-left font-bold">
            <TableCell className="text-center" colSpan={3}>Totales</TableCell>
            <TableCell className="text-right">${formatNumber(totals.total)}</TableCell>
            <TableCell className="text-right">${formatNumber(totals.cash)}</TableCell>
            <TableCell className="text-right">${formatNumber(totals.mpVani)}</TableCell>
            <TableCell className="text-right">${formatNumber(totals.mpGus)}</TableCell>
          </TableRow>
        </TableFooter>
        </Table>
      </div>
  </div>
  );
}

export default InvoicesList;
