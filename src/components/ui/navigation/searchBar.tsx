import React, { useState } from "react";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/form/input";
import { Button } from "../buttons/button";

type Filters = { [key: string]: string };

interface SearchBarProps {
    onSearch: (value: string, filterKey?: string) => void;
    placeholder: string;
    filters?: Filters;
}

export default function SearchBar({
    onSearch,
    placeholder,
    filters,
}: SearchBarProps) {
    const [searchValue, setSearchValue] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
    const [showFilters, setShowFilters] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        let filterKey = selectedFilter;

        // Si hay filtros disponibles y no hay ninguno seleccionado, toma el primero
        if (filters && !filterKey && searchValue.trim()) {
            filterKey = Object.keys(filters)[0];
            setSelectedFilter(filterKey);
        }

        onSearch(searchValue, filterKey);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleFilterSelect = (key: string) => {
        setSelectedFilter(key);
        setShowFilters(false);
    };

    return (
        <div className="flex items-center w-4/6 h-12 border border-gray-300 rounded-md focus-within:border-blue focus-within:ring-1 focus-within:ring-blue bg-white">
            {filters && (
                <div className="relative border-r border-gray-300">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-1 text-gray-600 rounded-r-none text-sm"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {selectedFilter ? filters[selectedFilter] : "Filtros"}
                    </Button>

                    {showFilters && (
                        <div className="absolute left-0 mt-2 w-44 bg-white border rounded-md shadow-md z-10">
                            {Object.entries(filters).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => handleFilterSelect(key)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                                        selectedFilter === key
                                            ? "bg-gray-100 font-medium"
                                            : ""
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <Input
                id="busquedaInput"
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border-none focus:ring-0 focus-visible:ring-0 shadow-none flex-1"
            />

            <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className="border-l border-gray-300 rounded-l-none text-gray-600 hover:text-blue px-3"
            >
                <Search className="w-4 h-4" />
            </Button>
        </div>
    );
}
