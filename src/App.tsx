// src/App.tsx
import React, { useState } from "react";
import TagView from "./components/TagView";

interface Tag {
  name: string;
  data?: string;
  children?: Tag[];
}

const initialTree: Tag = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

const App: React.FC = () => {
  const [tree, setTree] = useState<Tag>(initialTree);

  const updateTree = () => {
    setTree({ ...tree });
  };

  // Function to recursively clean the tree
  const cleanTree = (node: Tag): Tag => {
    const { name, data, children } = node;
    return {
      name,
      data,
      children: children ? children.map(cleanTree) : undefined,
    };
  };

  const exportTree = () => {
    const exportedTree = cleanTree(tree);
    alert(JSON.stringify(exportedTree, null, 2));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Nested Tags Tree
      </h1>
      <button
        onClick={exportTree}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Export
      </button>
      <TagView tag={tree} updateTag={updateTree} />
    </div>
  );
};

export default App;
