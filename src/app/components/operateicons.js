'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ActionButtons({ onAdd, onDelete, onSend }) {
  return (
    <div className="flex flex-col items-end gap-4">
      <div className="flex gap-4">
        <button onClick={onAdd} className="p-2 bg-white border rounded cursor-pointer">
          <FontAwesomeIcon icon={faPlus} className="text-[#702e1f]" />
        </button>
        <button onClick={onDelete} className="p-2 bg-white border rounded cursor-pointer">
          <FontAwesomeIcon icon={faTrash} className="text-[#702e1f]" />
        </button>
      </div>
      <button
        onClick={onSend}
        className="w-[3cm] mr-2 px-4 py-2 bg-[#702e1f] text-white rounded-lg border border-[#702e1f] hover:bg-[#702e1f] hover:text-white transition"
      >
        Send
      </button>
    </div>
  );
}