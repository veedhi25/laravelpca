import { useState } from "react";
import { useLayer } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import { siteSettings } from "@settings/site.settings";
import Avatar from "@components/ui/avatar";
import { zoomInBottom } from "@utils/motion/zoom-in-bottom";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";

export default function AuthorizedMenu() {

  const { data } = useCustomerQuery();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  // helper function to close the menu
  function close() {
    setOpen(false);
  }
  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    placement:
      router.locale === "ar" || router.locale === "he"
        ? "bottom-start"
        : "bottom-end", // we prefer to place the menu "bottom-end"
    triggerOffset: 10, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
  });

  const { closeSidebar, isAuthorize, setSidebarView, openSidebar } = useUI();


  function handleClick(path: string) {
    // close();
    router.push(path);
    return closeSidebar();
  }

  function url(){
      // window is not defined in server side rendering
      if (typeof window !== 'undefined') {

   return window?.location.href.includes('buylowcal-monthly-leaderboard-magazines')
   }}

   function handleSidebar(view: string) {
    setSidebarView(view);
    return openSidebar();
  }

  

  // console.log('me data',data)

  return (

    <>

      <button
          type="button"
          className="flex flex-col items-center  md:mr-16 lg:mr-10 lg+:pl-12 focus:outline-none"
          aria-label="toggle profile dropdown"
          onClick={
            () => handleSidebar("AUTH_MENU_VIEW")
            // () => setOpen(!isOpen)
          }
          {...triggerProps}
        >
          <Avatar
            src={
              data?.me?.profile?.avatar?.thumbnail ?? "/avatar-placeholder.svg"
            }
            title="user name"
          />
          {<p className={` ${url() ?'text-white' : 'text-black'} text-xs tracking-wide text-gray-700`}>{data?.me?.name.split(' ')[0]}</p>}
          <span className="sr-only">{t("user-avatar")}</span>
      </button>

      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              {...layerProps}
              initial="from"
              animate="to"
              exit="from"
              variants={zoomInBottom()}
              className="py-4 w-48 bg-light rounded  shadow-700 z-50 h-100 overflow-y-scroll"
            >
              {siteSettings.authorizedLinks.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                    <button
                      onClick={() => handleClick(href)}
                      className="block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none"
                    >
                      {t(label)}
                    </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
