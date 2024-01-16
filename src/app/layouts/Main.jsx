/**
 * Title: Write a program using JavaScript on Main
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

import React from "react";
import Header from "./Header";

const Main = ({ children }) => {
  return (
    <main className="h-screen w-screen">
      <section className="max-w-5xl mx-auto h-full flex flex-col gap-y-4 p-4">
        <Header />
        <section className="w-full h-full overflow-y-auto">{children}</section>
      </section>
    </main>
  );
};

export default Main;
