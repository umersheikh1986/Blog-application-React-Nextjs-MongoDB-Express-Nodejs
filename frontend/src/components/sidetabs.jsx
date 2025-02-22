import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const SlideTabsExample = () => {
  return (
    <div className="border-2 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-white p-1"
    >
      <Tab setPosition={setPosition}>
        <Link to="/">Home</Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link to="/about">About</Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link to="/Projects">Projects</Link>
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-black hover:text-white font-bold  md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white  md:h-12"
    />
  );
};
