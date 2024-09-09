// src/TagView.tsx
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
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(tag.name);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleAddChild = () => {
    if (tag.data) {
      tag.children = [{ name: "New Child", data: "Data" }];
      delete tag.data;
    } else if (tag.children) {
      tag.children.push({ name: "New Child", data: "Data" });
    }
    updateTag();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(e.target.value);

  const saveNewName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tag.name = newName;
      setEditingName(false);
      updateTag();
    }
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tag.data !== undefined) {
      tag.data = e.target.value;
      updateTag();
    }
  };

  return (
    <div className="ml-6 mb-4">
      <div className="flex items-center mb-2">
        <button className="mr-2 text-xl" onClick={toggleCollapse}>
          {collapsed ? ">" : "v"}
        </button>
        {editingName ? (
          <input
            type="text"
            className="border border-gray-300 p-1 rounded-md"
            value={newName}
            onChange={handleNameChange}
            onKeyDown={saveNewName}
          />
        ) : (
          <span
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => setEditingName(true)}
          >
            {tag.name}
          </span>
        )}
        <button
          onClick={handleAddChild}
          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
        >
          Add Child
        </button>
      </div>
      {!collapsed && (
        <div className="ml-4">
          {tag.data !== undefined ? (
            <input
              type="text"
              className="border border-gray-300 p-1 rounded-md mb-2"
              value={tag.data}
              onChange={handleDataChange}
            />
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
