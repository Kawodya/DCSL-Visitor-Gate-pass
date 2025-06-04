'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import HeadComponent from "../components/head";
import HistoryTable from "../components/his-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function DataGuiPage() {
  const [searchNIC, setSearchNIC] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    setSearchTerm(searchNIC);
  };

  const handleRefresh = () => {
    setSearchNIC("");
    setSearchTerm("");
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fff979] p-4">
      <HeadComponent />

      <h1 className="text-xl text-[#702E1F] font-bold mt-1 text-center">
        Visitor Gate Pass History
      </h1>

      {/* Search Field */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center w-full max-w-md px-4">
          <input
            type="text"
            placeholder="Search by NIC"
            value={searchNIC}
            onChange={(e) => setSearchNIC(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button className="ml-2" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#692418' }} />
          </button>
        </div>
      </div>

      {/* Table and Buttons Container */}
      <div className="relative mt-6 px-4">
        <HistoryTable searchTerm={searchTerm} />

        {/* Action Buttons at bottom right */}
        <div className="absolute right-0 -bottom-16 flex gap-4">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
          >
            Refresh
          </button>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
