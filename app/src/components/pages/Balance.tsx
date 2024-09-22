import { Card } from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getMovementByDate } from "@/services/getMovementByDate";
import { getPaymentsByIdAndDate } from "@/services/getPaymentsByIdAndDate";
import { getSuppliersPaymentsByDate } from "@/services/getSuppliersPaymentsByDate";
import { useEffect } from "react";

interface BalanceProps {
    date: string;
}

export const Balance = (props: BalanceProps) => {



    const getMovements = async () => {
        const data = await getMovementByDate('2024-08-08');
        console.log("getMovements", data);
    }

    const getSuppliersPayments = async () => {
        const data = await getSuppliersPaymentsByDate('2024-08-08');
        console.log("getSuppliersPayments", data);
    }

    const getCustomerPayments = async () => {
        console.log("getPaymentsByIdAndDate", '2024-08-08', 1);
        const data = await getPaymentsByIdAndDate({ date: '2024-08-08', invoiceId: 1 });
        console.log("getCustomerPayments", data);
    }


    useEffect(() => {

        console.log("useEffect")
    }, [])

    return (
        <div className="flex justify-center items-center flex-col h-full">
            <Card>
                <button onClick={getMovements}>getMovements</button>
                <button onClick={getSuppliersPayments}>getSuppliersPayments</button>
                <button onClick={getCustomerPayments}>getCustomerPayments</button>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Balance de {props.date}</h1>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-left">Ingresos</h2>
                        <h3 className="text-l font-bold mb-4 text-left">Clientes</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px] text-center">Fecha</TableHead>
                                    <TableHead className="text-left">Cliente</TableHead>
                                    <TableHead className="text-right w-[200px]">Total</TableHead>
                                    <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={5}>Total</TableCell>
                                    <TableCell className="text-right">
                                        {/* Suma total si es necesario */}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <h3 className="text-l font-bold mb-4 text-left">Generales</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[300px] flex-grow text-center">Descripción</TableHead>
                                    <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-right">
                                        {/* Suma total si es necesario */}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-left">Egresos</h2>
                        <h3 className="text-l font-bold mb-4 text-left">Proveedores</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px] text-center">Fecha</TableHead>
                                    <TableHead className="text-left">Cliente</TableHead>
                                    <TableHead className="text-right w-[200px]">Total</TableHead>
                                    <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={5}>Total</TableCell>
                                    <TableCell className="text-right">
                                        {/* Suma total si es necesario */}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <h3 className="text-l font-bold mb-4 text-left">Generales</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[300px] flex-grow text-center">Descripción</TableHead>
                                    <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Vani</TableHead>
                                    <TableHead className="w-[200px] text-center">Mp Gus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-right">
                                        {/* Suma total si es necesario */}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-left">Totales</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Totales</TableHead>
                                    <TableHead className="w-[200px] text-center">Efectivo</TableHead>
                                    <TableHead className="w-[200px] text-center">Transferencia</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Ingresos de clientes</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Ingresos generales</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Egresos de proveedores</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Egresos generales</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Balance en {props.date}</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Saldo anterior</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Saldo actual en {props.date}</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                    <TableCell className="text-center">data</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </Card>
        </div>
    );
}