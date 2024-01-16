/**
 * Title: Write a program using JavaScript on Providers
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

"use client";

import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </>
  );
};

export default Providers;
