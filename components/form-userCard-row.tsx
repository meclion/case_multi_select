import React from "react";
import CloseIcon from "@/components/icons/CloseIcon";

export default function FormUserCard({ user, onRemove }) {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between pl-1.5 border-b last:border-0"
    >
      <span className="bg-slate-200 p-2 rounded-xl flex items-center mt-0 justify-center whitespace-nowrap">
        {user.name}
        <button
          className="flex ml-1 h-6 w-6 bg-slate-400 rounded-md text-white text-xl justify-center items-center"
          onClick={() => onRemove(user.id)}
        >
          <CloseIcon className="size-5" />
        </button>
      </span>
    </div>
  );
}
