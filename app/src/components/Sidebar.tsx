import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
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
  PlusIcon,
  MagnifyingGlassIcon,
  AngleIcon,
  CookieIcon
} from "@radix-ui/react-icons";
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation
import { logout } from "@/services/logout";

const links = [
  { label: "Agregar facturas", path: "/agregar-facturas", icon: <PlusIcon className="h-6 w-6" /> },
  { label: "Consultar facturas", path: "/facturas", icon: <MagnifyingGlassIcon className="h-6 w-6" /> },
  { label: "Estadísticas", path: "/estadisticas", icon: <AngleIcon className="h-6 w-6" /> },
  { label: "Proveedores", path: "/proveedores", icon: <CookieIcon className="h-6 w-6" /> },
];

export const Sidebar = () => {
  const location = useLocation(); // Obtén la ubicación actual

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="w-full bg-gray">
      <Sheet >
        <NavigationMenu className="h-16 w-full max-w-none border-b border-gray-300 md:hidden">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center ">
            <Link to="/" className="border-hidden font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline">
            <img src="/distribuidoraLogo.svg" alt="logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">DistroApp</h1>
            </Link>
            </div>
            <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-foreground transition-colors md:hidden m-4 z-50"
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
            </SheetTrigger>
          </div>
        </NavigationMenu>

        <SheetContent className="flex flex-col items-center gap-4 w-[300px] h-screen">
          <SheetHeader>Distribuidora Pinto</SheetHeader>

          <NavigationMenu className="flex-initial ">
            <NavigationMenuList className="flex-col justify-between h-14 items-center ">

              {links.map(({ label, path, icon }, i) => (
                <NavigationMenuItem key={i} className="border-hidden flex flex-col items-center justify-center">
                  <SheetClose asChild>
                    <Link
                      to={path}
                      className={cn("font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline", {
                        'text-black': location.pathname === path,
                        'text-gray-500': location.pathname !== path,
                      })}
                    >
                      {icon}
                      {label}
                    </Link>
                  </SheetClose>
                </NavigationMenuItem>
              ))}
              <Button onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </NavigationMenuList>
          </NavigationMenu>

          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <NavigationMenu className="hidden max-w-none md:block h-16 border-b border-gray-300">
        <div className="flex items-center justify-center h-full ">
          <NavigationMenuList className="flex items-center space-x-8">
          <div className="flex items-center ml-4">
            <Link to="/" className="border-hidden font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline">
            <img src="/distribuidoraLogo.svg" alt="logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">DistroApp</h1>
            </Link>
          </div>
          
            {links.map(({ label, path, icon }, i) => (
              <Link
                key={i}
                to={path}
                className={cn("font-medium flex items-center text-sm transition-colors hover:text-black hover:no-underline", {
                  'text-black': location.pathname === path,
                  'text-gray-500': location.pathname !== path,
                })}
              >
                {icon}
                <span className="ml-2">{label}</span>
              </Link>
            ))}
              <Button onClick={handleLogout}>
                Cerrar sesión
              </Button>
          </NavigationMenuList>

        </div>
      </NavigationMenu>
    </div>
  );
};
