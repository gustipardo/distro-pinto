import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import {
  HamburgerMenuIcon,
  ClipboardIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  AngleIcon,
  CookieIcon
} from "@radix-ui/react-icons";
import { useLocation } from 'react-router-dom'; // Importa useLocation

const links = [
  { label: "Inicio", path: "/", icon: <ClipboardIcon className="h-6 w-6" /> },
  { label: "Agregar facturas", path: "/agregar-facturas", icon: <PlusIcon className="h-6 w-6" /> },
  { label: "Consultar facturas", path: "/consultar-facturas", icon: <MagnifyingGlassIcon className="h-6 w-6" /> },
  { label: "Estadísticas", path: "/estadisticas", icon: <AngleIcon className="h-6 w-6" /> },
  { label: "Proveedores", path: "/proveedores", icon: <CookieIcon className="h-6 w-6" /> },
];

export const Sidebar = () => {
  const location = useLocation(); // Obtén la ubicación actual

  return (
    <div className="w-screen">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="text-foreground transition-colors md:hidden absolute top-0 right-0 m-4 z-50"
          >
            <HamburgerMenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col items-center gap-4 w-[300px] h-screen">
          <SheetHeader>
          </SheetHeader>

          <NavigationMenu className="flex-initial ">
            <NavigationMenuList className="flex-col justify-between h-14 items-center ">
              {links.map(({ label, path, icon }, i) => (
                <NavigationMenuItem key={i}>
                  <SheetClose asChild>
                    <NavigationMenuLink
                      href={path}
                      className={cn("border-hidden font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline", {
                        'text-black': location.pathname === path,
                        'text-gray-500': location.pathname !== path,
                      })}
                    >
                      {icon}
                      {label}
                    </NavigationMenuLink>
                  </SheetClose>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <NavigationMenu className="hidden md:block h-16 w-full border-b border-gray-300">
        <div className="flex items-center justify-center h-full w-screen">
          <NavigationMenuList className="flex items-center space-x-4">
            {links.map(({ label, path, icon }, i) => (
              <NavigationMenuLink
                key={i}
                href={path}
                className={cn("font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline", {
                  'text-black': location.pathname === path,
                  'text-gray-500': location.pathname !== path,
                })}
              >
                {icon}
                <span className="ml-2">{label}</span>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </div>
  );
};
