import dynamic from "next/dynamic";
import { useUI } from "@contexts/ui.context";
import Sidebar from "@components/common/sidebar/sidebar";
const CartSidebarView = dynamic(
  () => import("@components/cart/cart-sidebar-view")
);
 
 
const MobileAuthorizedMenu = dynamic(
  () => import("@components/layout/mobile-menu/mobile-authorized-menu")
);
const MobileMainMenu = dynamic(
  () => import("@components/layout/mobile-menu/mobile-main-menu")
);

export default function SidebarContainer() {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return (
    <Sidebar
      open={displaySidebar}
      onClose={closeSidebar}
      variant={
        sidebarView === "FILTER_VIEW" ||
        sidebarView === "MAIN_MENU_VIEW" ||
        sidebarView === "FILTER_LAYOUT_TWO_VIEW"
          ? "left"
          : "right"
      }
      view={sidebarView}
      // useBlurBackdrop={true}
    >
      {sidebarView === "CART_VIEW" && <CartSidebarView />}
        {sidebarView === "MAIN_MENU_VIEW" && <MobileMainMenu />}
      {sidebarView === "AUTH_MENU_VIEW" && <MobileAuthorizedMenu />}
    </Sidebar>
  );
}
