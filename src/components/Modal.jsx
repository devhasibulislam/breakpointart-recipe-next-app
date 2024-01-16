/**
 * Title: Write a program using JavaScript on Modal
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
 * Date: 17, January 2024
 */

import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <section className="fixed top-0 left-0 w-screen h-screen bg-primary/50 z-10">
          <div className="w-full h-full flex justify-center items-center z-50">
            <div
              ref={modalRef}
              className="lg:w-1/3 md:w-3/4 w-4/5 max-h-[80%] mx-auto bg-white text-black p-8 border-2 border-secondary rounded overflow-y-auto z-[9999]"
            >
              {children}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Modal;
