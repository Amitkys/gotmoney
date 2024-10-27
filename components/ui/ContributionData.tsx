"use client";

import { useState } from "react";

interface Contribution {
    id: string;
    name: string;
    Village: string;
    inr: number;
}

export const ContributionData = ({ data }: { data: Contribution[] }) => {
    const [village, setVillage] = useState(''); // State for selected village
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    // const [minInr, setMinInr] = useState<number | ''>(''); // State for minimum INR
    const [filterType, setFilterType] = useState(''); // State for top or lowest filter

    // Get unique villages from the data
    const uniqueVillages = Array.from(new Set(data.map(contribution => contribution.Village)));

    // Filter contributions based on selected village, search term, and minimum INR
    const filteredData = data.filter((contribution) => {
        const matchesVillage = village ? contribution.Village.toLowerCase() === village.toLowerCase() : true;
        const matchesSearchTerm = searchTerm.toLowerCase() === '' ||
            contribution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contribution.Village.toLowerCase().includes(searchTerm.toLowerCase());
        // const matchesMinInr = minInr !== '' ? contribution.inr <= minInr : true;

        // return matchesVillage && matchesSearchTerm && matchesMinInr; // All conditions must be true
        return matchesVillage && matchesSearchTerm;
    });

    // Apply top or lowest filter based on filter type selected
    let displayedData = filteredData;
    if (filterType === 'top') {
        displayedData = filteredData.sort((a, b) => b.inr - a.inr).slice(0, 15); // Top 15
    } else if (filterType === 'lowest') {
        displayedData = filteredData.sort((a, b) => a.inr - b.inr).slice(0, 15); // Lowest 15
    }

    return (
        <div>
            {/* Dropdown for village selection */}
            <select
                className="select select-primary w-full max-w-xs"
                value={village} // Use value to control the select
                onChange={(e) => setVillage(e.target.value)}
            >
                <option value="" disabled>Select village</option>
                {uniqueVillages.map((villageName) => (
                    <option key={villageName} value={villageName}>
                        {villageName}
                    </option>
                ))}
            </select>

            {/* Input field for searching */}
            <input
                type="text"
                placeholder="Search by name or village"
                className="input input-primary w-full max-w-xs mt-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Dropdown for minimum INR selection */}
            {/* <select
                className="select select-primary w-full max-w-xs mt-4"
                value={minInr}
                onChange={(e) => setMinInr(Number(e.target.value) || '')}
            >
                <option value="">Select minimum INR</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={1500}>1500</option>
                <option value={2000}>2000</option>
                <option value={3000}>3000</option>
                <option value={5000}>5000</option>
            </select> */}

            {/* Dropdown for top or lowest selection */}
            <select
                className="select select-primary w-full max-w-xs mt-4"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="">Select filter type</option>
                <option value="top">Top 15 people</option>
                <option value="lowest">Lowest 15 people</option>
            </select>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Inr</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Display filtered contributions */}
                        {displayedData.map((contribution) => (
                            <tr key={contribution.id}>
                                <th>{contribution.name}</th>
                                <th>{contribution.Village}</th>
                                <th>{contribution.inr}</th>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





        </div>
    );
};
