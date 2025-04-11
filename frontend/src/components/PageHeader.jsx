import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col justify-center space-y-3 mb-4">
      <div
        className={`flex items-center ${
          title ? "justify-between" : "justify-end"
        }`}
      >
        {title && (
          <h1 className="text-2xl font-semibold text-blue-400">{title}</h1>
        )}
        <Link to={btnLink} className="bg-blue-500 text-white px-4 py-2 rounded">
          {btnText}
        </Link>
      </div>
      {onSubmit && (
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder={placeholder}
            className="border border-gray-300 focus:outline-blue-400 rounded px-4 py-2 w-full"
          />
        </form>
      )}
    </div>
  );
};

export default PageHeader;
