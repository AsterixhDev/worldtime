import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "components/ui/Select";
import Icon from "components/AppIcon";
import { DashboardFilters } from "../types";

interface FiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOptions = [
    { value: "name", label: "Name (A–Z)" },
    { value: "population", label: "Population" },
    { value: "landmass", label: "Landmass" },
    { value: "timezones", label: "Timezones" },
  ];

  const orderOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const handleSortByChange = (value: string) => {
    const newFilters = {
      ...filters,
      sortBy: value as DashboardFilters["sortBy"],
    };
    onFiltersChange(newFilters);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", value);
    setSearchParams(newParams);
  };

  const handleSortOrderChange = (value: string) => {
    const newFilters = {
      ...filters,
      sortOrder: value as DashboardFilters["sortOrder"],
    };
    onFiltersChange(newFilters);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortOrder", value);
    setSearchParams(newParams);
  };

  return (
    <div className="sticky top-32 z-40 mb-6 bg-surface/80 backdrop-blur-sm border-b border-border/50">
      <div
        className="
          max-w-7xl mx-auto 
          px-4 py-4 lg:px-6
          flex flex-col sm:flex-row sm:items-center sm:justify-between
          gap-4
        "
      >
        {/* Label */}
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Icon name="Sliders" size={18} />
          <span className="text-sm font-medium tracking-wide uppercase">
            Filters
          </span>
        </div>

        {/* Filters section */}
        <div
          className="
            grid grid-cols-[repeat(auto-fit,_minmax(150px,1fr))] sm:flex sm:flex-row 
            gap-3 sm:gap-4 w-full sm:w-auto
          "
        >
          {/* Sort by */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Icon
              name="ArrowUpDown"
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <Select
              value={filters.sortBy}
              onChange={handleSortByChange}
              options={sortOptions}
              placeholder="Sort by..."
              className="w-full sm:min-w-[10rem]"
              classes={{
                dropdown: "bg-white shadow-md rounded-md p-1",
                option:
                  "rounded-md px-2 py-2 hover:bg-gray-100 mb-1 last:mb-0",
                optionSelected:
                  "bg-blue-600 text-white hover:bg-blue-600 mb-1 last:mb-0",
              }}
            />
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Icon
              name={filters.sortOrder === "asc" ? "ArrowUp" : "ArrowDown"}
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <Select
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              options={orderOptions}
              placeholder="Order..."
              className="w-full sm:min-w-[8rem]"
              classes={{
                dropdown: "bg-white shadow-md rounded-md p-1",
                option:
                  "rounded-md px-2 py-2 hover:bg-gray-100 mb-1 last:mb-0",
                optionSelected:
                  "bg-blue-600 text-white hover:bg-blue-600 mb-1 last:mb-0",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
