"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavbarActions } from "../navbar-actions";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black fixed top-0 w-full z-50 h-16 mb-2">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <a href="#" className="flex items-center">
          <img
            src="https://andrestayupanta.neocities.org/imagesMvc/images.jpg"
            alt="Logo"
            className="h-12 w-auto"
          />
        </a>
        <div className="hidden md:flex md:items-center md:space-x-4 flex-grow">
          <Button className="text-white" onClick={() => router.push("/")}>Inicio</Button>
          <Button className="text-white" onClick={() => router.push("/secciones")}>Secciones</Button>
          <Button className="text-white" onClick={() => router.push("/estudiantes")}>Estudiantes</Button>
          <Button className="text-white" onClick={() => router.push("/pagos")}>Pagos</Button>
          <Button className="text-white" onClick={() => router.push("/becas")}>Becas</Button>
          <Button className="text-white" onClick={() => router.push("/morosidades")}>Morosidades</Button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-white focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <NavbarActions />
      </nav>
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Button className="text-white w-full text-left" onClick={() => { router.push("/"); toggleMenu(); }}>Inicio</Button>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/secciones"); toggleMenu(); }}>Secciones</Button>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/estudiantes"); toggleMenu(); }}>Estudiantes</Button>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/pagos"); toggleMenu(); }}>Pagos</Button>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/becas"); toggleMenu(); }}>Becas</Button>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/morosidades"); toggleMenu(); }}>Morosidades</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
