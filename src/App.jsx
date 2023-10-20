/** @format */

import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {
  Box,
  Button,
  HStack,
  Image,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import useStore from "./Store/usestore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

function App() {
  const [posture, setPosture] = useState(0);
  const { data, setData, dataHistory, setDataHistory } = useStore(
    (state) => ({
      data: state.data,
      setData: state.setData,
      dataHistory: state.dataHistory,
      setDataHistory: state.setDataHistory,
    }),
    shallow
  );

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const postureButton = [
    <Button
      w={"18rem"}
      colorScheme="green"
      onClick={() => {
        setData({
          ...data,
          actions: "Flying_Idle",
        });
        setDataHistory([
          ...dataHistory,
          { user: "player", msg: "Hi !! (ಠ╭╮ಠ)╭∩╮" },
        ]);
      }}
      _hover={{ transform: "scale(1.01)" }}
      _active={{ transform: "scale(0.99)" }}
      isDisabled={data.actions !== "Fast_Flying"}
    >
      Hi
    </Button>,
    <Button
      w={"18rem"}
      colorScheme="red"
      onClick={() => {
        setData({
          ...data,
          HPMonter: [data?.HPMonter[0] === 0 ? 0 : data?.HPMonter[0] - 1],
          actions: "HitReact",
        }),
          setDataHistory([
            ...dataHistory,
            { user: "player", msg: "Attack ! (งʘ_ʘ)ง" },
          ]);
      }}
      _hover={{ transform: "scale(1.01)" }}
      _active={{ transform: "scale(0.99)" }}
      isDisabled={data.actions !== "Fast_Flying"}
    >
      Attack
    </Button>,
    <Button
      w={"18rem"}
      colorScheme="blue"
      onClick={() => {
        setData({
          ...data,
          actions: "No",
        });
        setDataHistory([
          ...dataHistory,
          {
            user: "player",
            msg: "How about going to dinner tonight ? ☜╮(˚▽˚)╭☞",
          },
        ]);
      }}
      _hover={{ transform: "scale(1.01)" }}
      _active={{ transform: "scale(0.99)" }}
      isDisabled={data.actions !== "Fast_Flying"}
    >
      How about going to dinner tonight?
    </Button>,
  ];

  useEffect(() => {
    setTimeout(() => {
      setData({
        ...data,
        actions:
          data?.actions !== "Fast_Flying" && data?.actions !== "Punch"
            ? "Punch"
            : "Fast_Flying",
        HP: data?.actions === "Punch" ? data?.HP - 1 : data?.HP,
      });
      data?.actions === "No"
        ? setDataHistory([
            ...dataHistory,
            {
              user: "monter",
              msg: "No ! (ಠ益ಠ)",
            },
          ])
        : data?.actions === "Punch"
        ? setDataHistory([
            ...dataHistory,
            {
              user: "monter",
              msg: "Punch ! (◣‸◢)",
            },
          ])
        : "";
    }, 750);
    handleClickScroll(dataHistory?.length);
  }, [data.actions]);

  return (
    <VStack
      w={"100dvw"}
      h={"100dvh"}
      position={"relative"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <VStack
        w={"20rem"}
        h={"80%"}
        rounded={15}
        position={"absolute"}
        left={1}
        bg={"#FFFFFF80"}
        border={"1px solid #FFF"}
        overflow={"auto"}
      >
        {dataHistory?.map((itme, i) => (
          <HStack
            key={i}
            id={`${i + 1}`}
            w={"100%"}
            justifyContent={"flex-start"}
            px={2}
          >
            <Image
              h={"2rem"}
              w={"2rem"}
              rounded={"1rem"}
              objectFit="cover"
              src={
                itme?.user === "player"
                  ? "https://www.grindosaur.com/img/games/pokemon/new-pokemon-snap/profile-images/you-1.png"
                  : "/public/Images/monter.png"
              }
            />
            <Text fontWeight={"bold"}>: {itme?.msg}</Text>
          </HStack>
        ))}
        {/* <HStack w={"100%"} justifyContent={"flex-start"} px={2}>
          <Image
            h={"2rem"}
            src="https://www.grindosaur.com/img/games/pokemon/new-pokemon-snap/profile-images/you-1.png"
          />
          <Text fontWeight={"bold"}>: No !! ಠ_ಠ 🏹🍱</Text>
        </HStack> */}
      </VStack>
      <HStack
        w={"100%"}
        h={"3rem"}
        position={"absolute"}
        bottom={0}
        px={1}
        justifyContent={"space-between"}
      >
        <HStack w={"20rem"} h={"2rem"} spacing={0}>
          <ChevronLeftIcon
            h={"2rem"}
            bg={"#FFFFFF"}
            rounded={2}
            _hover={{ transform: "scale(1.1)" }}
            _active={{ transform: "scale(0.9)" }}
            onClick={() =>
              setPosture(posture === 0 ? postureButton.length - 1 : posture - 1)
            }
          />
          {postureButton[posture]}
          <ChevronRightIcon
            h={"2rem"}
            bg={"#FFFFFF"}
            rounded={2}
            _hover={{ transform: "scale(1.1)" }}
            _active={{ transform: "scale(0.9)" }}
            onClick={() =>
              setPosture(posture === postureButton.length - 1 ? 0 : posture + 1)
            }
          />
        </HStack>

        <HStack
          w={"20rem"}
          h={"2rem"}
          rounded={8}
          bg={"#00000050"}
          position={"relative"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            w={`${data?.HP * 10}%`}
            h={"100%"}
            rounded={8}
            bg={"#00FF00"}
            position={"absolute"}
            left={0}
          />
          <Text fontSize={"2rem"} fontWeight={"bold"} color={"#FFF"} zIndex={1}>
            {data?.HP}
          </Text>
        </HStack>
        <HStack w={"20rem"} h={"2rem"}></HStack>
      </HStack>
      {data?.actions === "Punch" ? (
        <VStack
          w={"100%"}
          h={"100%"}
          position={"absolute"}
          bg={"#FF000020"}
          zIndex={999}
        />
      ) : data?.HP === 0 ? (
        <VStack
          w={"100%"}
          h={"100%"}
          position={"absolute"}
          bg={"#FF000040"}
          zIndex={999}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <HStack
            w={"100%"}
            h={"10rem"}
            bg={"#FFFFFF80"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontSize={"8rem"} fontWeight={"extrabold"}>
              Game Over
            </Text>
          </HStack>
          <Button
            w={"6rem"}
            fontWeight={"bold"}
            onClick={() => {
              setData({ HP: 10, HPMonter: [10], actions: "Fast_Flying" });
              setDataHistory([]);
            }}
          >
            Reset
          </Button>
        </VStack>
      ) : (
        <></>
      )}
    </VStack>
  );
}

export default App;
