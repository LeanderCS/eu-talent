"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MagnifyingGlassIcon, BellIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <nav className="flex justify-between px-20 py-5 items-center bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-xl text-gray-800 font-bold">EU-TALENT</h1>

      {/* Barre de recherche */}
      <div className="flex items-center border border-gray-300 px-3 py-1 rounded-lg">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
        <input
          className="ml-2 outline-none bg-transparent text-gray-700 placeholder-gray-500"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>

      {/* Navigation */}
      <ul className="flex items-center space-x-6">
        <li className="font-semibold text-gray-700 hover:text-gray-900">
          <Link href="/">Home</Link>
        </li>
        <li className="font-semibold text-gray-700 hover:text-gray-900">
          <Link href="/articles">COUNTRIES</Link>
        </li>

        {/* Icônes */}
        <li className="cursor-pointer hover:text-gray-900">
          <BookOpenIcon className="h-6 w-6 text-gray-600" />
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <BellIcon className="h-6 w-6 text-gray-600" />
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <UserIcon className="h-6 w-6 text-gray-600" />
        </li>
      </ul>
    </nav>
  );
};

export default Header;