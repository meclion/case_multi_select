"use client";
import React, { useState, useEffect } from "react";
import { fetchUserInformation } from "@/www/users/route";
import FormSelect from "@/components/form-select";
import FormUserCardRow from "@/components/form-userCard-row";
import FormUserCardCol from "@/components/form-userCard-col";
import Image from "next/image";
import DownArrow from "@/public/images/sort_down_48px.png";

export default function Home() {
  const [userInformation, setUserInformation] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUserName, setSearchUserName] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    const userData = async () => {
      try {
        const users = await fetchUserInformation();
        setUserInformation(users);
      } catch (error) {
        console.error("Error fetching user information", error);
      }
    };

    userData();
  }, []);

  const toggleUserSelection = (user) => {
    selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      ? setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        )
      : setSelectedUsers([...selectedUsers, user]);
  };

  const removeSelectedUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const renderHighlightedName = (name) => {
    const startIndex = name.toLowerCase().indexOf(searchUserName.toLowerCase());
    if (startIndex === -1) return name;

    const endIndex = startIndex + searchUserName.length;
    return (
      <>
        {name.substring(0, startIndex)}
        <strong>{name.substring(startIndex, endIndex)}</strong>
        {name.substring(endIndex)}
      </>
    );
  };

  const filteredUsers = userInformation.filter((user) =>
    user.name.toLowerCase().includes(searchUserName.toLowerCase())
  );

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const sortedSelectedUsers = [...selectedUsers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="flex flex-col m-auto max-w-md items-center justify-center p-5">
      <div className="flex border items-center justify-center border-slate-400 h-15 rounded-2xl w-full mb-5 relative">
        <div className="flex flex-row items-center left-0 h-10 w-8/12 overflow-hidden">
          {selectedUsers.map((user) => (
            <FormUserCardRow
              key={user.id}
              user={user}
              onRemove={removeSelectedUser}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Search"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
          className="w-4/12 p-3 outline-none"
        />
        <Image
          src={DownArrow}
          alt="Down Arrow"
          className="flex h-6 w-6 mr-2 cursor-pointer"
          onClick={toggleListVisibility}
        />

        {isListVisible && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-400 rounded-xl shadow-lg z-10">
            <div className="p-2 max-h-60 overflow-y-auto scrollbar-transparent">
              {sortedSelectedUsers.length > 0 ? (
                sortedSelectedUsers.map((user) => (
                  <FormUserCardCol
                    key={user.id}
                    user={user}
                    onRemove={removeSelectedUser}
                  />
                ))
              ) : (
                <div className="p-2 text-center text-slate-500">
                  No selected users
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex border border-slate-400 rounded-2xl w-full mt-2">
        <table className="w-full">
          <tbody>
            {filteredUsers.map((user) => (
              <FormSelect
                key={user.id}
                user={user}
                selected={selectedUsers.some(
                  (selectedUser) => selectedUser.id === user.id
                )}
                toggleUserSelection={toggleUserSelection}
                renderHighlightedName={renderHighlightedName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
