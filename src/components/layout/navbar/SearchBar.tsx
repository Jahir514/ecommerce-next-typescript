import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="hidden lg:block bg-sectionBackground rounded-2xl shadow-sm h-10">
      <form className="w-full h-full flex">
        <div className="input-group flex justify-start gap-2 w-full h-full px-3">
          <Search className="h-5 w-5 text-font-17 mt-[10px] font-bold" color="#41b883" />
          <input
            type="text"
            className="form-control bg-sectionBackground w-full h-full text-font-17 text-textColorLight placeholder:text-font-17 placeholder:text-[#495057] focus-visible:outline-0"
            placeholder="Search for products..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
