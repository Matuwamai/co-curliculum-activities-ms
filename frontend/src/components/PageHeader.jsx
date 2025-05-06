import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const PageHeader = ({
  title = null,
  btnText,
  btnLink,
  onSubmit = null,
  placeholder = null,
}) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Title and Button Row */}
      <div
        className={`flex flex-col sm:flex-row ${
          title ? "justify-between" : "justify-end"
        } items-start sm:items-center gap-3`}
      >
        {title && (
          <h1 className="text-2xl md:text-3xl font-semibold text-[#3B82F6]">
            {title}
          </h1>
        )}

        {btnText && btnLink && (
          <Link
            to={btnLink}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            {btnText}
          </Link>
        )}
      </div>

      {/* Search Form */}
      {onSubmit && (
        <form onSubmit={handleSubmit} className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder={placeholder || "Search..."}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all duration-200"
          />
        </form>
      )}
    </div>
  );
};

export default PageHeader;
