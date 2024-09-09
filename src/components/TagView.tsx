import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Tag {
  name: string;
  data?: string;
  children?: Tag[];
}

interface TagViewProps {
  tag: Tag;
  updateTag: () => void;
}

const TagView: React.FC<TagViewProps> = ({ tag, updateTag }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(tag.name);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const saveNewName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tag.name = newName;
      setEditingName(false);
      updateTag();
    }
  };

  const handleAddChild = () => {
    if (tag.data !== undefined) {
      delete tag.data;
      tag.children = [{ name: "New Child", data: "Data" }];
    } else if (tag.children) {
      tag.children.push({ name: "New Child", data: "Data" });
    }
    updateTag();
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tag.data !== undefined) {
      tag.data = e.target.value;
      updateTag();
    }
  };

  return (
    <div className="ml-6 mb-4 p-2 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center mb-2">
          <button
            className="mr-2 text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={toggleCollapse}
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
          {editingName ? (
            <input
              type="text"
              className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newName}
              onChange={handleNameChange}
              onKeyDown={saveNewName}
            />
          ) : (
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:text-blue-700"
              onClick={() => setEditingName(true)}
            >
              {tag.name}
            </span>
          )}
        </div>
        <button
          onClick={handleAddChild}
          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Child
        </button>
      </div>
      {!collapsed && (
        <div className="ml-4 mt-2">
          {tag.data !== undefined ? (
            <div className="flex items-center">
              <span className="me-4 font-bold">Data</span>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                value={tag.data}
                onChange={handleDataChange}
              />
            </div>
          ) : (
            tag.children &&
            tag.children.map((child, index) => (
              <TagView key={index} tag={child} updateTag={updateTag} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
