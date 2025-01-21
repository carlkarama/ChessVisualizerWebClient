import { useState } from 'react';
import { Node } from './Node';

interface TreeNode {
  id: number;
  text: string;
  position: [number, number, number];
  children?: TreeNode[];
}

const initialTree: TreeNode = {
  id: 1,
  text: 'Start',
  position: [0, 3, 0],
  children: [
    {
      id: 2,
      text: 'New Node',
      position: [-2, 1, 0],
      children: [],
    },
    {
      id: 3,
      text: 'New Node',
      position: [2, 1, 0],
      children: [],
    },
  ],
};

export const Tree = () => {
  const [tree, setTree] = useState<TreeNode>(initialTree);

  const handleUpdate = (id: number, newText: string) => {
    const updateNode = (node: TreeNode) => {
      if (node.id === id) {
        node.text = newText;
      }
      node.children?.forEach(updateNode);
    };
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      updateNode(updatedTree);
      return updatedTree;
    });
  };

  const renderTree = (node: TreeNode) => (
    <Node
      key={node.id}
      position={node.position}
      initialText={node.text}
      onUpdate={(newText) => handleUpdate(node.id, newText)}
    />
  );

  return (
    <group>
      {renderTree(tree)}
      {tree.children?.map((child) => renderTree(child))}
    </group>
  );
};
