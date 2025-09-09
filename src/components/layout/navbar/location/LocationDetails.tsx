



/**
 * LocationDetails component
 * Handles district and area selection for branch location.
 * Uses local state for selection and syncs with Redux/global state.
 * Props:
 * - sendDataToParent: callback to close dialog
 * - branches: array of branch objects
 */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedArea, setBranchId, setSelectedBranch } from "@/features/locations/locationSlice";

import type { Branch as SliceBranch } from "@/features/locations/locationSlice";


/**
 * Branch interface extends slice Branch type for compatibility with backend data.
 */
interface Branch extends SliceBranch {
  _id: string;
  district?: { name: string };
  areas?: { name: string }[];
}

interface LocationDetailsProps {
  sendDataToParent: (childValue: boolean) => void;
  branches: Branch[];
}


const LocationDetails: React.FC<LocationDetailsProps> = ({ sendDataToParent, branches }) => {
  const dispatch = useDispatch();

  // Local state for area, branch, and district selection
  const [selectedArea, setSelectedAreaState] = useState<string>("");
  const [branchId, setBranchIdState] = useState<string>("");
  const [selectedBranch, setSelectedBranchState] = useState<Branch | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [filterAreas, setFilteredAreas] = useState<{ name: string }[]>([]);

  /**
   * Memoized list of unique districts from branches
   */
  const uniqueDistricts = React.useMemo(() => {
    if (!branches || !branches.length) return [];
    const districtNames = branches
      .filter((branch) => branch && branch.district && branch.district.name)
      .map((branch) => branch.district!.name)
      .filter((name): name is string => typeof name === "string");
    const uniqueNames = [...new Set(districtNames)].sort((a, b) => a.localeCompare(b));
    return uniqueNames;
  }, [branches]);

  /**
   * When selectedArea changes, update selectedDistrict, branchId, and selectedBranch
   */
  useEffect(() => {
    if (selectedArea && branches && branches.length > 0) {
      const branchWithArea = branches.find((branch) => branch.areas && branch.areas.some((area) => area.name === selectedArea));
      if (branchWithArea && branchWithArea.district) {
        setSelectedDistrict(branchWithArea.district.name);
        setSelectedBranchState(branchWithArea);
        setBranchIdState(branchWithArea._id);
      }
    }
  }, [selectedArea, branches]);

  /**
   * When selectedDistrict changes, update filtered areas for dropdown
   */
  useEffect(() => {
    if (selectedDistrict && branches.length > 0) {
      const areas = branches
        .filter((branch) => branch.district && branch.district.name === selectedDistrict)
        .flatMap((branch) => branch.areas || [])
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredAreas(areas);
    } else {
      setFilteredAreas([]);
    }
  }, [selectedDistrict, branches]);

  /**
   * Handle area selection, update local state and sync with Redux
   */
  const handleAreaSelect = (areaName: string, selectedBranchId: string, selectedBranchObj: Branch) => {
    setSelectedAreaState(areaName);
    setBranchIdState(selectedBranchId);
    setSelectedBranchState(selectedBranchObj);
    // Optionally dispatch to Redux if you want to keep global state in sync
    dispatch(setSelectedArea(areaName));
    dispatch(setBranchId(selectedBranchId));
    dispatch(setSelectedBranch(selectedBranchObj as SliceBranch));
  };

  /**
   * Save selected branch/area to localStorage
   */
  const branchSelect = () => {
    if (branchId) localStorage.setItem("branchId", branchId);
    if (selectedArea) localStorage.setItem("selectedArea", selectedArea);
    if (selectedBranch) localStorage.setItem("selectedBranch", JSON.stringify(selectedBranch));
  };

  /**
   * Handle district dropdown change, reset area/branch selection
   */
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    if (selectedArea) {
      setSelectedAreaState("");
      setBranchIdState("");
      setSelectedBranchState(null);
      // Optionally dispatch to Redux
      dispatch(setSelectedArea(" "));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl w-96 mx-auto mt-[30vh]">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Select Your Area</h2>
      {/* District count */}
      <div className="text-xs text-gray-500 mb-2">Available districts: {uniqueDistricts.length}</div>
      {/* Dropdowns for district and area selection */}
      <div className="space-y-3">
        {/* District dropdown */}
        <select value={selectedDistrict} onChange={handleDistrictChange} className="w-full p-2 border rounded-lg">
          <option value="">Select District</option>
          {uniqueDistricts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
        {/* Area dropdown */}
        <select
          value={selectedArea}
          onChange={(e) => {
            const areaName = e.target.value;
            if (areaName) {
              const selectedBranchObj = branches.find((branch) => branch.areas && branch.areas.some((area) => area.name === areaName));
              const selectedBranchId = selectedBranchObj?._id || "";
              if (selectedBranchObj) {
                handleAreaSelect(areaName, selectedBranchId, selectedBranchObj);
              }
            }
          }}
          className="w-full p-2 border rounded-lg"
          disabled={!selectedDistrict}
        >
          <option value="">Select Area</option>
          {filterAreas.map((area, idx) => (
            <option key={idx} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
      {/* Action buttons */}
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={() => {
            branchSelect();
            sendDataToParent(false);
            window.location.href = "/";
          }}
          className="px-4 py-2 bg-buttonColor text-white rounded-lg"
          disabled={!selectedArea}
        >
          Save
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
            sendDataToParent(false);
          }}
          className="px-4 py-2 bg-buttonColor text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationDetails;
