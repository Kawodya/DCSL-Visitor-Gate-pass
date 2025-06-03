'use client';
import { useEffect, useState } from 'react';

export default function HistoryTable({ searchTerm }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error('History load failed', err));
  }, []);

  // Filter history based on searchTerm
  const filteredHistory = searchTerm
    ? history.filter(item =>
        item.visitorNICs.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : history;

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4 text-center">Visitor History</h3>

      <div className="overflow-x-auto">
        <div className="max-h-[280px] overflow-y-auto">
          <table className="min-w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Visitor Names</th>
                <th className="border border-gray-300 px-4 py-2">NICs</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Reason</th>
                <th className="border border-gray-300 px-4 py-2">Date of Visit</th>
                <th className="border border-gray-300 px-4 py-2">End Visit</th>
                <th className="border border-gray-300 px-4 py-2">Vehicle</th>
                <th className="border border-gray-300 px-4 py-2">Authorized Person</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2 whitespace-pre-wrap">{item.visitorNames}</td>
                    <td className="border border-gray-300 px-2 py-2 whitespace-pre-wrap">{item.visitorNICs}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.visitCompany}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.department}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.reason}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.dateOfVisit}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.endVisit}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.vehicleNumber}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.hodPerson}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No matching NIC found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
