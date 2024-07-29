import { useState } from 'react';
import { ClipboardIcon, PlusIcon, Cross1Icon, HamburgerMenuIcon, MagnifyingGlassIcon, AngleIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className={`fixed top-0 right-0 bg-gray-800 text-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`} style={{ width: '300px', height: '100vh' }}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold">Distro Pinto</h2>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <Button variant="ghost" className="w-full flex ">
              <ClipboardIcon className="h-6 w-6 mr-3" />
              Facturas
            </Button>
            <Button variant="ghost" className="w-full flex items-center">
              <PlusIcon className="h-6 w-6 mr-3" />
              Agregar facturas
            </Button>
            <Button variant="ghost" className="w-full flex items-center">
              <MagnifyingGlassIcon className="h-6 w-6 mr-3" />
              Consultar facturas
            </Button>
            <Button variant="ghost" className="w-full flex items-center">
              <AngleIcon className="h-6 w-6 mr-3" />
              Estadisticas
            </Button>
            {/* Añadir más botones según sea necesario */}
          </nav>
        </div>
      </div>
      <Button variant="ghost" onClick={toggleSidebar} className="fixed top-0 right-0 m-4 z-50">
        {isOpen ? <Cross1Icon className="h-6 w-6" /> : <HamburgerMenuIcon className="h-6 w-6" />}
      </Button>
      <div className="flex-1">
        {/* Contenido principal */}
      </div>
    </div>
  );
}
