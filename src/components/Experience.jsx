/** @format */

import {
  Box,
  Environment,
  OrbitControls,
  Text,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Dragon } from "./Dragon";
import { useEffect, useState } from "react";
import useStore from "../Store/usestore";
import { shallow } from "zustand/shallow";
import { DragonEvolved } from "./Dragon_Evolved";

export const Experience = () => {
  const map = useTexture("textures/anime_water_word.jpg");
  const [actionsDragon, setActionsDragon] = useState("Fast_Flying");

  const { data, setData } = useStore(
    (state) => ({
      data: state.data,
      setData: state.setData,
    }),
    shallow
  );
  const [positionZ, setPositionZ] = useState(-11);

  useEffect(() => {
    positionZ > 1
      ? ""
      : setTimeout(() => {
          setPositionZ(positionZ + 0.1);
        }, 50);
  }, [positionZ]);

  const [test, setTest] = useState(true);
  useEffect(() => {
    test && data?.HPMonter?.[0] <= 0 ? setTest(false) : "";
    test && data?.HPMonter?.[0] <= 0
      ? setData({ ...data, HPMonter: [10] })
      : "";
  }, [data?.HPMonter]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <DragonEvolved
        scale={0.6}
        position-y={test ? 10 : -0.5}
        position-z={positionZ}
        actions={data?.actions}
      />

      <Dragon
        scale={0.6}
        position-y={!test ? 10 : -0.5}
        position-z={positionZ}
        actions={data?.actions}
      />
      <Box
        args={[1, 0.1, 0.1]}
        position-y={0}
        position-z={positionZ}
        material-color={"#77777720"}
      />
      <Box
        args={[data?.HPMonter?.[0] / 10, 0.1, 0.11]}
        position-y={0}
        position-x={(data?.HPMonter?.[0] / 10 - 1) / 2}
        position-z={positionZ + 0.01}
        material-color={"#00FF00"}
      />
      {/* <Box
        args={[0.4, 0.2, 0.1]}
        position={[-2.8, -1.3, 4.4]}
        material-color={"#FF0000"}
        onClick={() => setActionsDragon("HitReact")}
      />
      <Text position={[-2.8, -1.3, 4.46]} fontSize={0.1}>
        Attack
      </Text> */}
      <mesh>
        <sphereGeometry args={[10, 320, 320]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>
  );
};
