"use client";

import { MdOutlinePlaylistRemove } from "react-icons/md";

interface IProps {
  title?: string;
}

const EmptyList = ({ title = "Nenhum item encontrado" }: IProps) => {
  return (
    <li className="flex justify-center w-full h-full text-primary select-none">
      <div className="flex flex-col justify-center items-center gap-2 py-31.5 border-1 rounded w-full h-full">
        <MdOutlinePlaylistRemove size={40} />

        <p className="text-sm text-center">{title}</p>
      </div>
    </li>
  );
};

export default EmptyList;
