import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import Cell from "./Cell";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
import * as THREE from "three";

const Plane = (props) => {
  const mesh = useRef();
  return (
    <mesh receiveShadow {...props} ref={mesh}>
      <planeBufferGeometry
        attach="geometry"
        args={[props.width, props.height]}
      />
      <meshPhongMaterial attach="material" color="white" />
    </mesh>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = THREE.PCFSoftShadowMap;
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.target = new THREE.Object3D().position.set(2, 0, 2);
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.update();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const Scene = () => {
  const { scene, camera } = useThree();
  scene.background = new THREE.Color(0x000000);
  const targetObj = new THREE.Object3D();
  scene.add(targetObj);
  targetObj.position.set(2, 0, 2);
  camera.position.set(-5, 5, 0);

  return (
    <>
      <ambientLight intensity={0.2} />
      <Plane
        width={500}
        height={500}
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <spotLight
        castShadow
        intensity={0.5}
        target={targetObj}
        position={[2, 10, 2]}
        angle={Math.PI / 5}
        penumbra={1}
      />

      {[...Array(5)].map((_, index) => {
        return [...Array(5)].map((_, jndex) => {
          return (
            <Cell
              phase={index + jndex}
              key={index + jndex}
              position={[index, (index + jndex) / 5, jndex]}
            />
          );
        });
      })}
      <CameraController />
    </>
  );
};

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
