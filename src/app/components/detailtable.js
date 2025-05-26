'use client';

import { useState } from "react";
import ActionButtons from "./operateicons"; // Adjust path if needed

export default function Detailtable() {
  const columns = [
    'Visitor Name',
    'NIC',
    'Visit Company',
    'Department',
    'Reason',
    'Date of Visit',
    'End of Visit',
    'Vehicle Number',
    'HOD/Authorized person'
  ];

  const [userInputs, setUserInputs] = useState(Array(8).fill(''));
  const [department, setDepartment] = useState('');
  const [extraRows, setExtraRows] = useState([]);

  const handleChange = (inputIndex, value) => {
    const newData = [...userInputs];
    newData[inputIndex] = value;
    setUserInputs(newData);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleAddRow = () => {
    setExtraRows([...extraRows, { name: '', nic: '' }]);
  };

  const handleDeleteRow = () => {
    setExtraRows(extraRows.slice(0, -1));
  };

  const handleExtraRowChange = (index, field, value) => {
    const updatedRows = [...extraRows];
    updatedRows[index][field] = value;
    setExtraRows(updatedRows);
  };

  // Email sending function WITHOUT database references
  const handleSendEmail = async () => {
    const names = [userInputs[0], ...extraRows.map(row => row.name)];
    const nics = [userInputs[1], ...extraRows.map(row => row.nic)];

    const payload = {
      visitorNames: names,
      visitorNICs: nics,
      visitCompany: userInputs[2],
      department,
      reason: userInputs[3],
      dateOfVisit: userInputs[4],
      endVisit: userInputs[5],
      vehicleNumber: userInputs[6],
      hodPerson: userInputs[7],
    };

    alert("Sending data:\n" + JSON.stringify(payload, null, 2));

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        alert('✅ Email sent successfully!');
      } else {
        alert('❌ Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error occurred while sending data.');
    }
  };

  return (
    <div className="space-y-4">
      <table className="table-auto border-collapse border border-gray-400 w-full text-center min-w-[50ch]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border border-gray-400 px-3 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Main input row */}
          <tr>
            {columns.map((col, colIndex) => {
              if (col === 'Department') {
                return (
                  <td key="department" className="border border-gray-400 p-1 bg-gray-100">
                    <div className="flex flex-col gap-1">
                      {[
                        'Admin', 'Brewing', 'Engineering', 'Finance',
                        'Human Resource', 'Information Technology', 'Logistics & Warehouse',
                        'Planning', 'Packaging', 'Quality', 'Supply Chain',
                        'Safety', 'Security', 'Utility'
                      ].map((dept) => (
                        <label key={dept} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="department"
                            value={dept}
                            checked={department === dept}
                            onChange={handleDepartmentChange}
                            className="accent-blue-600"
                          />
                          <span className="whitespace-nowrap">{dept}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                );
              }

              const inputIndex = colIndex < 3 ? colIndex : colIndex - 1;

              return (
                <td key={colIndex} className="border border-gray-400 p-1">
                  <textarea
                    value={userInputs[inputIndex]}
                    onChange={(e) => handleChange(inputIndex, e.target.value)}
                    className="w-full box-border p-1 border border-gray-300 rounded resize-none overflow-auto min-h-[60px]"
                  />
                </td>
              );
            })}
          </tr>

          {/* Extra visitor rows */}
          {extraRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.name}
                  onChange={(e) => handleExtraRowChange(index, 'name', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded min-h-[60px]"
                />
              </td>
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.nic}
                  onChange={(e) => handleExtraRowChange(index, 'nic', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded min-h-[60px]"
                />
              </td>
              {[...Array(7)].map((_, i) => (
                <td key={i} className="border border-gray-400 p-1"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Delete buttons */}
      <ActionButtons onAdd={handleAddRow} onDelete={handleDeleteRow} />

      {/* Email send button */}
      <div className="flex justify-end">
        <button
          onClick={handleSendEmail}
          className="mt-4 px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
