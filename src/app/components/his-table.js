'use client';
import { useEffect, useState } from 'react';

export default function HistoryTable() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error('History load failed', err));
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-4 text-center">Visitor History</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
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
            {history.map((item, idx) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
