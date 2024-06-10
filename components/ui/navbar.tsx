"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavbarActions } from "../navbar-actions";
import SearchBar from "./search-bar";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  return (
    <header className="bg-black fixed top-0 w-full z-50 h-16 mb-2">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <a href="#" className="flex items-center">
          <Image
            src="https://andrestayupanta.neocities.org/imagesMvc/images.jpg"
            alt="Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
        </a>
        <div className="hidden md:flex md:items-center md:space-x-4 flex-grow">
          <Button className="text-white bg-black" onClick={() => router.push("/")}>Inicio</Button>
          <Button className="text-white bg-black" onClick={() => router.push("/secciones")}>Secciones</Button>
          <div className="relative">
            <Button className="text-white bg-black" onClick={toggleDropdown}>
              Administración
              <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/estudiantes"); setDropdownOpen(false); }}>Estudiantes</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/pagos"); setDropdownOpen(false); }}>Pagos</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/becas"); setDropdownOpen(false); }}>Becas</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/morosidades"); setDropdownOpen(false); }}>Morosidades</Button>
                </div>
              </div>
            )}
          </div>
          <Button className="text-white bg-black" onClick={() => router.push("/resultados")}>Resultados</Button>
        </div>
        <SearchBar />
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
          <div className="relative">
            <Button className="text-white w-full text-left" onClick={toggleMobileDropdown}>
              Administración
              <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            {mobileDropdownOpen && (
              <div className="mt-2 w-full rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/estudiantes"); setMobileDropdownOpen(false); toggleMenu(); }}>Estudiantes</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/pagos"); setMobileDropdownOpen(false); toggleMenu(); }}>Pagos</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/becas"); setMobileDropdownOpen(false); toggleMenu(); }}>Becas</Button>
                  <Button className="w-full text-left text-white bg-black" onClick={() => { router.push("/morosidades"); setMobileDropdownOpen(false); toggleMenu(); }}>Morosidades</Button>
                </div>
              </div>
            )}
          </div>
          <Button className="text-white w-full text-left" onClick={() => { router.push("/resultados"); toggleMenu(); }}>Resultados</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
