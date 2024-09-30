import React from 'react'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className="w-full  flex items-center justify-center mb-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-black"
      />
    </div>
  );
}

export default SearchBar