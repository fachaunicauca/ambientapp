
import React, { useState } from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/form/input";

export default function SearchBar({
    onSearch,
    placeholder,
}: {
    onSearch: (value: string) => void;
    placeholder: string;
}) {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full sm:w-11/12 md:w-3/12">
            <Input
                id="busquedaInput"
                type="text"
                className="border-blue pr-10"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-2 flex items-center text-blue">
                <Search className="w-5 h-5" />
            </div>
        </div>
    );
}