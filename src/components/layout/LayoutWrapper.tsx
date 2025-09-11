// LayoutWrapper component migrated and modernized for Next.js/RTK Query
"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { setSelectedBranch } from "@/features/locations/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Sidenav from "./Sidenav";
import DebugRedux from '../DebugRedux';

interface LayoutWrapperProps {
  children: ReactNode;
}

const excludedPages = ["/checkout", "/order", "/payment", "/login", "/register"];

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const locationRef = useRef<any>(null);
  // Redux selectors (RTK Query format)
  const sidebarOpen = useSelector((state: any) => state.sidenav.isOpen);
  const activeCategory = useSelector((state: any) => state.sidenav.activeCategory);
  const activeSubCategory = useSelector((state: any) => state.sidenav.activeSubCategory);
  const isCartOpen = useSelector((state: any) => state.cart?.isCartOpen);
  // Area selection from localStorage
  const [area, setArea] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setArea(localStorage.getItem("selectedArea"));
      const storedBranchId = localStorage.getItem("branchId");
      if (storedBranchId) {
        // You may want to fetch branch details from your branch list if needed
        dispatch(setSelectedBranch({ id: storedBranchId, name: "" })); // Set name if available
      }
    }
  }, [dispatch]);

  // Sidebar visibility logic
  const shouldShowSidebar = !excludedPages.includes(pathname);

  // Redux action handlers (stubbed, implement as needed)
  const handleCategorySelect = (categoryId: string) => {
    // dispatch(setActiveCategory(categoryId));
  };
  const handleSubCategorySelect = (subCategory: string) => {
    // dispatch(setActiveSubCategory(subCategory));
  };

  // Cart initialization logic (stubbed, implement as needed)
  useEffect(() => {
    // if (localStorage.userToken) {
    //   dispatch(setCartInformation());
    // } else {
    //   dispatch(loadLocalCartProducts());
    // }
  }, [dispatch]);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   dispatch(loadLocalCartProducts());
    // }
  }, [dispatch /*, isAuthenticated*/]);

  // Area selection dialog logic (stubbed, implement as needed)
//   useEffect(() => {
//     // if (!localSelectArea && locationRef.current) {
//     //   setTimeout(() => {
//     //     locationRef.current.openDialog();
//     //   }, 300);
//     // }
//   }, [localSelectArea]);

  if (area === null) {
    // Render nothing until client-side value is available
    return null;
  }

  return (
    <div className="bg-sectionBackgroundLight relative">
      {/* <DebugRedux /> */}
      {/* ToastContainer can be added here if using react-toastify */}
      {area ? (
        <div className="relative">
          {/* Fixed Sidebar - Only show when sidebarOpen is true and page allows sidebar */}
          {sidebarOpen && shouldShowSidebar && (
            <div className="fixed left-0 top-[170px] w-1/5 bg-white shadow-lg h-[calc(100vh-170px)] overflow-y-auto border-r border-gray-200 z-10">
              <div className="p-4">
                <Sidenav
                  isOpen={sidebarOpen}
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  onCategorySelect={handleCategorySelect}
                  onSubCategorySelect={handleSubCategorySelect}
                  onReset={() => {}}
                />
              </div>
            </div>
          )}
          {/* Main Content - Adjust margin based on sidebar state and page type */}
          <div className={`transition-all duration-300 ${sidebarOpen && shouldShowSidebar ? "ml-[20%]" : "ml-0"}`}>
            {children}
            {/* {isCartOpen && <CartDetails />} */}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* <Location ref={locationRef} /> */}
        </div>
      )}
    </div>
  );
};

export default LayoutWrapper;
