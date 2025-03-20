import { Canvas } from "@react-three/fiber";
import { Tree } from "./Tree";
import { OrbitControls } from "@react-three/drei";
import { NodeData } from "./Node";

export default function Recursive() {
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