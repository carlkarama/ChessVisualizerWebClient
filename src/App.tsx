import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, Html } from "@react-three/drei";
import { useState } from "react";

// Interface for Node Data
interface NodeData {
  id: number;
  label: string;
  children: NodeData[];
  isEditing?: boolean;
}

// Props for the Node component
interface NodeProps {
  position: [number, number, number];
  onClick: () => void;
  label: string;
  onLabelChange: (newLabel: string) => void;
  isEditing: boolean;
}

// Node component (3D cube representing a node)
function Node({ position, onClick, label, onLabelChange, isEditing }: NodeProps) {
  const [currentLabel, setCurrentLabel] = useState(label);

  const handleSubmit = () => {
    if (currentLabel.trim()) {
      onLabelChange(currentLabel);
    }
  };

  return (
    <group position={position} onClick={onClick}>
      <mesh scale={[3, 3, 3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#ffa500"} />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={2.5}>  {/* Increased Font Size */}
        {label}
      </Text>

      {isEditing && (
        <Html position={[-2, -1, 0]}>
          <input
            type="text"
            value={currentLabel}
            onChange={(e) => setCurrentLabel(e.target.value)}
            style={{
              background: "lightgrey",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              color: "black",
              fontSize: "1em",  // Larger Font for Input
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginLeft: "10px",
              background: "green",
              color: "white",
              borderRadius: "50%",
              padding: "8px",
              fontSize: "1em",  // Larger Font for Buttons
            }}
          >
            ✔️
          </button>
          <button
            onClick={() => onLabelChange(label)}
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "8px",
              fontSize: "1em",
            }}
          >
            ❌
          </button>
        </Html>
      )}
    </group>
  );
}

// Render lines between parent and child nodes
function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  return <Line points={[start, end]} color="white" lineWidth={1.5} />;
}

// Tree Component (Recursive)
function Tree({ node, position }: { node: NodeData; position: [number, number, number] }) {
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

// Main Scene
export default function App() {
  const root: NodeData = { id: 1, label: "Start", children: [] };

  return (
    <Canvas
      camera={{ position: [0, 0, 100] }}
      style={{ background: '#101010', height: '95vh', width: '100vw' }}
    >
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={2.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <OrbitControls enableZoom enablePan />
      <group rotation={[-0.2, 0.1, 0]}>
        <Tree node={root} position={[0, 30, 0]} />
      </group>
    </Canvas>
  );
}
