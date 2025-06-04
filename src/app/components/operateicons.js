'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ActionButtons({ onAdd, onDelete, onSend }) {
  return (
    <div className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <button onClick={onAdd} className="p-2 bg-[#702E1F] border rounded cursor-pointer">
          <FontAwesomeIcon icon={faPlus} className="text-white" />
        </button>
        <button onClick={onDelete} className="p-2 bg-[#702E1F] border rounded cursor-pointer">
          <FontAwesomeIcon icon={faTrash} className="text-white" />
        </button>
      </div>
     
    </div>
  );
}