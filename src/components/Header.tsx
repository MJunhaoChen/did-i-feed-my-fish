"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between shadow-sm">
      <nav className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="ghost" className="text-lg font-semibold">
            Home
          </Button>
        </Link>
        <Link to="/fish-feeder">
          <Button variant="ghost" className="text-lg font-semibold">
            Fish Feeder
          </Button>
        </Link>
      </nav>
      <ModeToggle />
    </header>
  );
};

export default Header;