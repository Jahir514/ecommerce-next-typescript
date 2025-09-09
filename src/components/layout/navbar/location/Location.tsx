


/**
 * Location component
 * Displays the selected area and loading/error states.
 * Uses RTK Query to fetch branches and Dialog for area selection.
 */
import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Dialog } from "@headlessui/react";
import LocationDetails from "./LocationDetails";
import { useGetBranchesQuery } from "@/features/locations/locationsApi";

const Location: React.FC = () => {
  // State for dialog open/close
  const [isOpen, setIsOpen] = useState(false);
  // Fetch branches data using RTK Query
  const { data, isLoading, isError } = useGetBranchesQuery(undefined);

  // State for selected area (from localStorage or API)
  const [selectedArea, setSelectedArea] = useState<string>("");

  /**
   * On branches data change, try to get selected area from localStorage.
   * If not found, fallback to first branch name from API.
   */
  useEffect(() => {
    const storedArea = localStorage.getItem("selectedArea");
    if (storedArea) {
      setSelectedArea(storedArea);
    } else {
      setSelectedArea(data?.data?.[0]?.name || "");
    }
  }, [data]);

  /**
   * Callback to handle dialog close from child component
   */
  const handleLocation = (childValue: boolean) => {
    setIsOpen(childValue);
  };

  return (
    <div>
      {/* Area display and open dialog trigger */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {isLoading ? (
          <p className="p-0">Loading...</p>
        ) : isError ? (
          <p className="p-0">Something wrong!</p>
        ) : (
          <p className="text-themeColor text-font-17 flex items-center">
            {selectedArea ? (
              <>
                {/* Location icon and area name */}
                <MapPin className="mr-1 w-4 h-4 mt-[-2px]" />
                {selectedArea
                  .split(" ")
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </>
            ) : (
              "No area selected"
            )}
          </p>
        )}
      </div>
      {/* Dialog for selecting area */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed w-full min-h-screen inset-0 z-50 items-center"
      >
        <LocationDetails sendDataToParent={handleLocation} branches={data?.data} />
      </Dialog>
    </div>
  );
};

export default Location;
