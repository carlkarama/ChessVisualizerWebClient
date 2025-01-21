import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Html, Text } from '@react-three/drei';

interface NodeProps {
  position: [number, number, number];
  initialText: string;
  onUpdate: (newText: string) => void;
}

export const Node = ({ position, initialText, onUpdate }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle entering and exiting edit mode
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(text);  // Update node label
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <group position={position}>
      {isEditing ? (
        <Html position={[0, 0.8, 0]} center>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur();
            }}
            style={{
              fontSize: '14px',
              padding: '4px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              width: '80px',
              background: 'white',
            }}
          />
        </Html>
      ) : (
        <>
          <Text
            onDoubleClick={handleDoubleClick}
            fontSize={0.4}
            position={[0, 0.8, 0]}
          >
            {text}
          </Text>
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </>
      )}
    </group>
  );
};
