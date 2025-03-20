
import { Line } from "@react-three/drei";
import { useState } from "react";
import { Node, NodeData } from './Node';

// Tree Component (Recursive)
export function Tree({ node, position }: { node: NodeData; position: [number, number, number] }) {
  const [children, setChildren] = useState<NodeData[]>(node.children || []);
  const [nodeLabel, setNodeLabel] = useState(node.label);
  const [isEditing, setIsEditing] = useState(node.isEditing || false);

  const addChild = () => {
    const newNode: NodeData = {
      id: Math.random(),
      label: "New Move",
      children: [],
      isEditing: true,
    };
    setChildren([...children, newNode]);
  };

  const updateLabel = (newLabel: string) => {
    setNodeLabel(newLabel);
    setIsEditing(false);
  };

  // Render lines between parent and child nodes
  function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    return <Line points={[start, end]} color="white" lineWidth={1.5} />;
  }

  return (
    <>
      <Node
        position={position}
        onClick={addChild}
        label={nodeLabel}
        onLabelChange={updateLabel}
        isEditing={isEditing}
      />
      {children.map((child, index) => {
        const childPos: [number, number, number] = [
          position[0] + (index - children.length / 2) * 12,
          position[1] - 14,
          position[2],
        ];
        return (
          <group key={child.id}>
            <ConnectionLine start={position} end={childPos} />
            <Tree node={child} position={childPos} />
          </group>
        );
      })}
    </>
  );
}