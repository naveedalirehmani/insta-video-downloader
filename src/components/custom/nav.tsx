"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { raleway } from "@/fonts";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

function Navbar({}: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = theme === "dark";
  return (
    <div className="container flex justify-between py-6">
      <div
        className={cn(
          raleway.className,
          "logo text-xl md:text-4xl font-extrabold"
        )}
      >
        <Link href="/">
          Instagram.<span className="text-insta">online</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={toggleTheme} variant="outline">
          {isActive ? <Sun className="spin-slow"/> : <Moon />}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
