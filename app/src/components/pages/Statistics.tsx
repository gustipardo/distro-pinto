import { InvoiceBarChart } from "../InvoiceBarChart"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


  const chartData2 = {
    data: [
      { day: "Lunes", cash: 215000, credit: 100000 },
      { day: "Martes", cash: 250000, credit: 180000 },
      { day: "Miércoles", cash: 225000, credit: 220000 },
      { day: "Jueves", cash: 260000, credit: 150000 },
      { day: "Viernes", cash: 245000, credit: 170000 },
      { day: "Sábado", cash: 275000, credit: 140000 },
      { day: "Domingo", cash: 230000, credit: 200000 },
    ],
    rangeOfDates: { start: "2024-08-01", end: "2024-08-08" },
    Trending: 7
  };
  
  const chartData3 = {
    data: [
      { day: "Lunes", cash: 165000, credit: 50000 },
      { day: "Martes", cash: 200000, credit: 130000 },
      { day: "Miércoles", cash: 175000, credit: 170000 },
      { day: "Jueves", cash: 210000, credit: 100000 },
      { day: "Viernes", cash: 195000, credit: 120000 },
      { day: "Sábado", cash: 225000, credit: 90000 },
      { day: "Domingo", cash: 180000, credit: 150000 },
    ],
    rangeOfDates: { start: "2024-08-09", end: "2024-08-16" },
    Trending: -2
  };
  
  
  const chartData4 = {
    data: [
      { day: "Lunes", cash: 165000, credit: 50000 },
      { day: "Martes", cash: 200000, credit: 130000 },
      { day: "Miércoles", cash: 175000, credit: 170000 },
      { day: "Jueves", cash: 210000, credit: 100000 },
      { day: "Viernes", cash: 195000, credit: 120000 },
      { day: "Sábado", cash: 225000, credit: 90000 },
      { day: "Domingo", cash: 180000, credit: 150000 },
    ],
    rangeOfDates: { start: "2024-08-16", end: "2024-08-23" },
    Trending: 5
  };
  

export const Stadistic = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            Estadísticas
            <Carousel className="w-8/12">
              <CarouselContent className="">

                <CarouselItem className="p-4">
                  <InvoiceBarChart chartData={chartData2} />
                </CarouselItem>

                <CarouselItem className="p-4">
                <InvoiceBarChart chartData={chartData3} />
                </CarouselItem>

                <CarouselItem className="p-4">
                <InvoiceBarChart chartData={chartData4} />
                </CarouselItem>

              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />

            </Carousel>
        </div>
    )
}
