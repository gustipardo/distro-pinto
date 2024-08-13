import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { formatDateToDDMMYYYY } from "@/services/formatDate"


const chartConfig = {
  cash: {
    label: "Efectivo",
    color: "#4CAF50", // Verde
  },
  credit: {
    label: "Mercado Pago",
    color: "#FF9800", // Naranja
  },
} satisfies ChartConfig


type InvoiceBarChartData = {
  day: string
  cash: number
  credit: number
}

type InvoiceBarChartRangeOfDates = {
  start: string
  end: string
}

type InvoiceChart = {
  data: InvoiceBarChartData[]
  rangeOfDates: InvoiceBarChartRangeOfDates
  Trending: number
}

interface InvoiceBarChartProps {
  chartData: InvoiceChart
}

export const InvoiceBarChart = ({ chartData }: InvoiceBarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturación Diaria</CardTitle>
        <CardDescription>{formatDateToDDMMYYYY(chartData.rangeOfDates.start)} - {formatDateToDDMMYYYY(chartData.rangeOfDates.end)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="cash" fill={chartConfig.cash.color} radius={4} />
            <Bar dataKey="credit" fill={chartConfig.credit.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          La tendencia esta semana es de {chartData.Trending}%{ chartData.Trending > 0 ?<TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" /> }
        </div>
        <div className="leading-none text-muted-foreground">
          Facturacion de la semana
        </div>
      </CardFooter>
    </Card>
    
  )
}
