import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

function Cell(props) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = (2 / 3) * Math.sin(6 * t + props.phase / 2) + 1;
  });

  return (
    <mesh castShadow {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 0.5, 1]} />
      <meshPhysicalMaterial attach="material" color="orange" />
    </mesh>
  );
}

export default Cell;
