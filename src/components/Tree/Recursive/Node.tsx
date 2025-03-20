import { useState } from "react";
import { Text, Html } from "@react-three/drei";


// Interface for Node Data
export interface NodeData {
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
export function Node({ position, onClick, label, onLabelChange, isEditing }: NodeProps) {
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