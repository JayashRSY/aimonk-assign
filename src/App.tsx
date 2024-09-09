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
  const [exportedJson, setExportedJson] = useState<string>("");

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

  // Function to export the tree and display JSON string
  const exportTree = () => {
    const exportedTree = cleanTree(tree);
    const jsonString = JSON.stringify(exportedTree, null, 2);
    setExportedJson(jsonString); 
    
    // const blob = new Blob([jsonString], { type: "application/json" });

    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "tree_structure.json"; 
    // document.body.appendChild(link);
    // link.click();

    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Nested Tags Tree
      </h1>
      <TagView tag={tree} updateTag={updateTree} />
      <button
        onClick={exportTree}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Export
      </button>
      {exportedJson && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-md text-sm text-gray-700 overflow-x-auto">
          {exportedJson}
        </pre>
      )}
    </div>
  );
};

export default App;
