"use client";

import { MdOutlinePlaylistRemove } from "react-icons/md";

const EmptyList = () => {
  return (
    <li className="flex justify-center mt-10 select-none">
      <div className="flex flex-col justify-center items-center gap-2 py-31.5 border-1 rounded w-full max-w-xl">
        <MdOutlinePlaylistRemove size={40} />

        <p className="text-sm text-center">Nenhum item encontrado</p>
      </div>
    </li>
  );
};

export default EmptyList;
