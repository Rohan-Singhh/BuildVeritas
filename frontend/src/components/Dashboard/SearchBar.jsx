import { useState, useEffect } from "react";

export const SearchBar = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
}) => {
  const [term, setTerm] = useState(value);

  // keep local state in sync when parent updates value
  useEffect(() => {
    setTerm(value);
  }, [value]);

  // debounce calls to onChange for performance
  useEffect(() => {
    const id = setTimeout(() => {
      if (onChange && term !== value) onChange(term);
    }, 300);
    return () => clearTimeout(id);
  }, [term, onChange, value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.(term);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-7 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          />
          {/* {term && (
            <button
              type="button"
              onClick={() => {
                setTerm("");
                onChange?.("");
                onSearch?.("");
              }}
              className="px-3 py-2 bg-gray-100 rounded-md text-sm"
            >
              Clear
            </button>
          )} */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div
              onClick={() => onSearch?.(term)}
              className="w-7.5 h-7.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <select className="px-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg">
            <option>All Specializations</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Interior Design</option>
          </select>

          <select className="px-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg">
            <option>All Cities</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Pune</option>
          </select>
        </div>
      </div>
    </div>
  );
};
