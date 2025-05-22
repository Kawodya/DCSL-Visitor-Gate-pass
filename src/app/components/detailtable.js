'use client';
// import the useState function
import { useState } from "react";

// create the function to render the table
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

  // 8 inputs (excluding Department)
  const [userInputs, setUserInputs] = useState(Array(8).fill(''));
  const [department, setDepartment] = useState('');

  // when typing in an input field
  const handleChange = (inputIndex, value) => {
    const newData = [...userInputs];
    newData[inputIndex] = value;
    setUserInputs(newData);
  };

  // when selecting a department
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Editable Table */}
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
                  >
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

              // Adjust input index to skip Department column
              const inputIndex = colIndex < 3 ? colIndex : colIndex - 1;

              // Use textarea for all except Department
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
        </tbody>
      </table>
    </div>
  );
}
