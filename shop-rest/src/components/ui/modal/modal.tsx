import { CloseIcon } from "@components/icons/close-icon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { createBrowserHistory } from 'history';
import { useRouter } from 'next/router';
import { usePreventRouteChange } from "./prevent-route-change-hook";
 import { ArrowLeftIcon } from "@heroicons/react/outline";


export default function Modal({ open, onClose, children, view }: any) {
  
  const cancelButtonRef = useRef(null);
  const { t } = useTranslation("common");

  
  const router = useRouter();

  useEffect(() => {
    const handleBackButton = (event: { preventDefault: () => void; }) => {
      if (open) {
        event.preventDefault();
        onClose();
      }
    };

    if (!open && router.asPath.endsWith('#modal')  && view !== 'OTP_REGISTER') {
      router.back();
    } else if (!open && router.asPath.endsWith('#modal') && view !== 'OTP_REGISTER') {
      router.back();
    }

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [open, onClose, view,router]);
  

  return (

    <Transition show={open} as={Fragment}>

      <Dialog
        as="div"
        className="fixed inset-0 z-50  overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >

        <div className="min-h-full md:p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >

            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >

            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >

          {/* Replace the close button with a navbar */}
          <div className=" inline-block min-w-content border max-w-full overflow-hidden text-start align-middle transition-all  md:rounded-xl relative">
               
              <div className="bg-gray-50 w-full p-4 text-white flex items-center">
                <button
                  onClick={onClose}
                  aria-label="Close panel"
                  ref={cancelButtonRef}
                  className="inline-block outline-none focus:outline-none"
                >
                  <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
                </button>
                <h2 className="ml-2"> </h2>
              </div>
              {children}
            </div>


            {/* close button */}
            {/* <div className="inline-block min-w-content max-w-full overflow-hidden text-start align-middle transition-all  md:rounded-xl relative">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="inline-block md:hidden outline-none focus:outline-none absolute end-4 top-4 z-[60]"
              >
                <span className="sr-only">{t("text-close")}</span>
                <CloseIcon className="w-8 h-8" />
              </button>
              {children}
            </div> */}
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
