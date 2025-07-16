import { UsersContext } from "@/contexts/users";
import { InputHTMLAttributes, useContext, useRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

const InputDocs = ({ id, ...rest }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleFile } = useContext(UsersContext);

  return (
    <div className="flex justify-center items-center border-1 border-light rounded h-full">
      <input
        id={id}
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".csv"
        multiple={false}
        onClick={(e) => (e.currentTarget.value = "")}
        onChange={(e) => handleFile(e)}
        tabIndex={-1}
        {...rest}
      />

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 border hover:border-secondary border-light rounded w-full max-w-50 text-light hover:text-secondary transition-all duration-300 cursor-pointer"
        >
          Escolher arquivo
        </button>
      </div>
    </div>
  );
};

export default InputDocs;
