import React, { FC } from "react";

interface Props {
  label?: string;
}

const SearchBar: FC<Props> = ({ label }): JSX.Element => {
  return (
    <div className="space-y-2 dark:bg-primary-dark bg-primary sticky top-0 z-50 rounded transition">
      {label ? (
        <label htmlFor="search-bar">
          <span className="font-semibold text-2xl dark:text-low-contrast-dark text-low-contrast font-ibm_plex-400">
            {label}
          </span>
        </label>
      ) : null}
      <input
        type="text"
        className="p-2 w-full border-2 border-contrast-dark bg-transparent rounded outline-none text-lg dark:text-low-contrast-dark text-low-contrast font-ibm_plex-400"
        placeholder="Search post.."
      />
    </div>
  );
};

export default SearchBar;
