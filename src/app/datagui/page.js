'use client';

// Import the Head component
import HeadComponent from "../components/head";
import HistoryTable from "../components/his-table";

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Export default function
export default function DataGuiPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <HeadComponent />

      <h1 className="text-xl font-bold mt-1 text-center">
        Visitor Gate Pass History
      </h1>

      {/* Search Field */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center w-full max-w-md px-4">
          <input
            type="text"
            placeholder="Search by NIC"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span className="ml-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#692418' }} />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 px-4">
        <HistoryTable />
      </div>
    </div>
  );
}
