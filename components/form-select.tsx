import React from "react";

export default function FormSelect({
  user,
  selected,
  toggleUserSelection,
  renderHighlightedName,
}) {
  return (
    <tr
      key={user.id}
      className="flex text-left items-center *:m-1.5 border-b border-b-neutral-400 "
    >
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleUserSelection(user)}
          className="ml-1.5 "
        />
      </td>
      <td>
        <img src={user.image} className="h-10 w-10 rounded-md" />
      </td>
      <td>
        <span className="text-slate-600">
          {renderHighlightedName(user.name)}
        </span>{" "}
        <br />
        <span className="text-sm text-slate-500">
          {user.episode.length} Episodes
        </span>
      </td>
    </tr>
  );
}
