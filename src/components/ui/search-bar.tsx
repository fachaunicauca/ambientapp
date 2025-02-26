import React, { ChangeEvent } from 'react';

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="relative w-full max-w-md">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000"
                className="absolute top-2 left-3"
            >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
            <input
                type="text"
                value={search}
                placeholder="Buscar Estudiante"
                className="p-2 pl-10 border rounded-full w-full shadow-inner text-sm tracking-0.1 leading-23"
                onChange={handleChange}
            />
        </div>
    );
}
