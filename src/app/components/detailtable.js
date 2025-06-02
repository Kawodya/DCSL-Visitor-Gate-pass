'use client';

import { useState } from 'react';
import ActionButtons from './operateicons'; // Adjust path if needed

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
    'HOD/Authorized person',
  ];

  // User inputs for first (main) row except Department (handled separately)
  const [userInputs, setUserInputs] = useState(Array(8).fill(''));
  const [department, setDepartment] = useState('');
  // Additional visitor rows, only for name and NIC
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
    if (extraRows.length === 0) return;
    setExtraRows(extraRows.slice(0, -1));
  };

  const handleExtraRowChange = (index, field, value) => {
    const updatedRows = [...extraRows];
    updatedRows[index][field] = value;
    setExtraRows(updatedRows);
  };

  //send email function
  const handleSendEmail = async () => {
    const names = [userInputs[0], ...extraRows.map((row) => row.name)];
    const nics = [userInputs[1], ...extraRows.map((row) => row.nic)];

    const payload = {
      visitorNames: names,
      visitorNICs: nics,
      visitCompany: userInputs[2],
      department: department,
      reason: userInputs[3],
      dateOfVisit: userInputs[4],
      endVisit: userInputs[5],
      vehicleNumber: userInputs[6],
      hodPerson: userInputs[7],
    };

    try {
      // 1. Send Email
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!emailRes.ok) throw new Error('❌ Failed to send email.');

      const emailResult = await emailRes.json();
      if (!emailResult.success) throw new Error('❌ Email sending failed: ' + emailResult.error);

      // 2. Save to Excel
      const saveRes = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) throw new Error('❌ Failed to save to Excel.');

      const saveResult = await saveRes.json();
      if (!saveResult.success) throw new Error('❌ Excel save failed: ' + saveResult.error);

      alert('✅ Email sent and Excel file saved successfully!');
    } catch (error) {
      console.error(error);
      alert('❌ An error occurred:\n' + error.message);
    }
  };

  // Download Excel function
  async function handleDownloadExcel() {
    try {
      const response = await fetch('/api/download-excel');
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'visitor_data.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  }

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
          <tr>
            {columns.map((col, colIndex) => {
              if (col === 'Department') {
                return (
                  <td
                    key="department"
                    className="border border-gray-400 p-1 bg-gray-100"
                    rowSpan={extraRows.length > 0 ? extraRows.length + 1 : 1}
                  >
                    <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto">
                      {[
                        'Admin',
                        'Brewing',
                        'Engineering',
                        'Finance',
                        'Human Resource',
                        'Information Technology',
                        'Logistics & Warehouse',
                        'Planning',
                        'Packaging',
                        'Quality',
                        'Supply Chain',
                        'Safety',
                        'Security',
                        'Utility',
                      ].map((dept) => (
                        <label
                          key={dept}
                          className="flex items-center gap-2 text-sm whitespace-nowrap"
                        >
                          <input
                            type="radio"
                            name="department"
                            value={dept}
                            checked={department === dept}
                            onChange={handleDepartmentChange}
                            className="accent-blue-600"
                          />
                          <span>{dept}</span>
                        </label>
                      ))}
                    </div>
                  </td>
                );
              }

              // Because Department cell spans rows, exclude it from textareas
              const inputIndex = colIndex < 3 ? colIndex : colIndex - 1;

              return (
                <td key={colIndex} className="border border-gray-400 p-1">
                  <textarea
                    value={userInputs[inputIndex]}
                    onChange={(e) => handleChange(inputIndex, e.target.value)}
                    className="w-full box-border p-1 border border-gray-300 rounded resize-none overflow-auto min-h-[60px]"
                    rows={3}
                  />
                </td>
              );
            })}
          </tr>

          {extraRows.map((row, index) => (
            <tr key={index}>
              {/* Visitor Name */}
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.name}
                  onChange={(e) => handleExtraRowChange(index, 'name', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded min-h-[60px]"
                  rows={3}
                />
              </td>
              {/* NIC */}
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.nic}
                  onChange={(e) => handleExtraRowChange(index, 'nic', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded min-h-[60px]"
                  rows={3}
                />
              </td>
              {/* Empty cells for other columns */}
              {[...Array(7)].map((_, i) => (
                <td key={i} className="border border-gray-400 p-1"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Delete buttons */}
      <ActionButtons onAdd={handleAddRow} onDelete={handleDeleteRow} />

      {/* Send & Download buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
        >
          Send
        </button>

        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Excel
        </button>

        <button
        onClick={() => alert('History button clicked')} // Replace this with your actual logic
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
        History
       </button>
        
      </div>
    </div>
  );
}
