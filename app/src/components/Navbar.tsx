import { useState } from 'react';
import { FaceIcon, ImageIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">MiLogo</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Button variant="ghost">Inicio</Button>
                <Button variant="ghost">Acerca de</Button>
                <Button variant="ghost">Servicios</Button>
                <Button variant="ghost">Contacto</Button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" onClick={toggleSidebar}>
              {isOpen ? <FaceIcon className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button variant="ghost" onClick={toggleSidebar}>Inicio</Button>
          <Button variant="ghost" onClick={toggleSidebar}>Acerca de</Button>
          <Button variant="ghost" onClick={toggleSidebar}>Servicios</Button>
          <Button variant="ghost" onClick={toggleSidebar}>Contacto</Button>
        </div>
      </div>
    </div>
  );
}
