/**
 * Title: Write a program using JavaScript on Header
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 16, January 2024
 */

import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex flex-row justify-between">
      <Link href="/" className="">
        Recipe App
      </Link>
      <div className="flex flex-row items-center gap-x-4">
        <Link href="/recipe/add" className="">
          Add Recipe
        </Link>
        <span className="border h-2/3" />
        <Link href="/recipe/all" className="">
          List Recipes
        </Link>
      </div>
    </nav>
  );
};

export default Header;
