'use client';

import { useState } from 'react';
import ActionButtons from './operateicons';
import { useRouter } from 'next/navigation';

export default function Detailtable() {
  const router = useRouter();

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

  const [userInputs, setUserInputs] = useState(Array(8).fill(''));
  const [department, setDepartment] = useState('');
  const [extraRows, setExtraRows] = useState([]);

  const handleChange = (inputIndex, value) => {
    const newData = [...userInputs];
    newData[inputIndex] = value;
    setUserInputs(newData);
  };

  const handleDepartmentChange = (e) => setDepartment(e.target.value);

  const handleAddRow = () => setExtraRows([...extraRows, { name: '', nic: '' }]);

  const handleDeleteRow = () => {
    if (extraRows.length > 0) setExtraRows(extraRows.slice(0, -1));
  };

  const handleExtraRowChange = (index, field, value) => {
    const updatedRows = [...extraRows];
    updatedRows[index][field] = value;
    setExtraRows(updatedRows);
  };

  const handleSend = async () => {
    const names = [userInputs[0], ...extraRows.map((row) => row.name)];
    const nics = [userInputs[1], ...extraRows.map((row) => row.nic)];
    const nicRegex = /^\d{9,12}[vV]?$/; // ← MUST be defined
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    



    // Validation: all fields required
    if (
      names.some(name => !name.trim()) ||
      nics.some(nic => !nic.trim()) ||
      !userInputs[2].trim() || // Visit Company
      !department.trim() ||    // Department
      !userInputs[3].trim() || // Reason
      !userInputs[4].trim() || // Date of Visit
      !userInputs[5].trim() || // End Visit
      !userInputs[6].trim() || // Vehicle Number
      !userInputs[7].trim()    // HOD/Authorized Person
    ) {
      alert('❌ Please fill in all fields before sending.');
      return;
    }

    // Validation: NICs must be numbers only
    
    if (!nics.every(nic => nicRegex.test(nic))) {
      alert('❌ NICs should contain only numbers, optionally ending with "v" or "V".');
      return;
    }
    //Validation set for  date of visit and end the visit

    if(!dateRegex.test(userInputs[4]) || !dateRegex.test(userInputs[5])){
       alert('❌ Date fields must be in the format DD/MM/YYYY.');
       return;

    }

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
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const emailResult = await emailRes.json();
      if (!emailRes.ok || !emailResult.success) {
        throw new Error(emailResult.error || 'Email sending failed');
      }

      const saveRes = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const saveResult = await saveRes.json();
      if (!saveRes.ok || !saveResult.success) {
        throw new Error(saveResult.error || 'Saving failed');
      }

      alert('✅ Email sent and data saved to Excel + History!');

      // Clear form fields
      setUserInputs(Array(8).fill(''));
      setDepartment('');
      setExtraRows([]);

    } catch (error) {
      console.error(error);
      alert('❌ ' + error.message);
    }
  };

  const handleDownloadExcel = async () => {
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
  };

  return (
    <div className="space-y-4">
      <table className="table-auto border-collapse border border-gray-400 w-full text-center min-w-[50ch]">
        <thead>
          <tr className='bg-[#702E1F] text-white'>
            {columns.map((col) => (
              <th key={col} className="border-4 border-gray-400 px-3 py-3">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((col, colIndex) => {
              if (col === 'Department') {
                return (
                  <td key="department" className="border border-gray-400 p-1 bg-[#702E1F] text-white" rowSpan={extraRows.length + 1}>
                    <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto">
                      {[ 'Admin', 'Brewing', 'Engineering', 'Finance', 'Human Resource',
                        'Information Technology', 'Logistics & Warehouse', 'Planning',
                        'Packaging', 'Quality', 'Supply Chain', 'Safety', 'Security', 'Utility',
                      ].map((dept) => (
                        <label key={dept} className="flex items-center gap-2 text-sm whitespace-nowrap">
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

              const inputIndex = colIndex < 3 ? colIndex : colIndex - 1;

              return (
                <td key={colIndex} className="border border-gray-400 p-1">
                  <textarea
                    value={userInputs[inputIndex]}
                    onChange={(e) => handleChange(inputIndex, e.target.value)}
                    className="w-full box-border p-1 border-2 border-black rounded resize-none overflow-auto min-h-[60px]"
                    rows={3}
                  />
                </td>
              );
            })}
          </tr>

          {extraRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.name}
                  onChange={(e) => handleExtraRowChange(index, 'name', e.target.value)}
                  className="w-full p-1 border-2 border-black rounded min-h-[60px]"
                  rows={3}
                />
              </td>
              <td className="border border-gray-400 p-1">
                <textarea
                  value={row.nic}
                  onChange={(e) => handleExtraRowChange(index, 'nic', e.target.value)}
                  className="w-full p-1 border-2 border-black rounded min-h-[60px]"
                  rows={3}
                />
              </td>
              {[...Array(7)].map((_, i) => (
                <td key={i} className="border border-gray-400 p-1"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ActionButtons onAdd={handleAddRow} onDelete={handleDeleteRow} />

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
        >
          Send
        </button>

        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
        >
          Download Excel
        </button>

        <button
          onClick={() => router.push('/datagui')}
          className="px-4 py-2 bg-[#702E1F] text-white rounded hover:bg-[#702E1F]"
        >
          History
        </button>
      </div>
    </div>
  );
}
