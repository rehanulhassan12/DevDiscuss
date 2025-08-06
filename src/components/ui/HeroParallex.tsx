"use client"
import React from "react";

import {
  motion,
  useTransform,
  MotionValue,
  useScroll,
  useSpring
} from "framer-motion";

import Link from "next/link";
import Image from "next/image";



export default function HeroParallex({ products, Header }: {
  products: {
    title: string,
    link: string,
    thumbnail: string
  }[],
  Header: React.ReactNode
}) {

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(0, 5);
  const thirdRow = products.slice(0, 5);
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });


  const springConfig = {
    damping: 40,
    stiffness: 300,
    bounce: 100
  };


  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );


  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {Header}

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="" >

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`product-${product.title}-${index}`}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`product-${product.title}-${index}`}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`product-${product.title}-${index}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}




export const ProductCard = ({ product, translate }: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  },
  translate: MotionValue<number>;
}) => {

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -18
      }}
      key={`product-${product.title}`}
      className="group/product h-96 w-[28rem] relative flex-shrink-0"

    >

      <Link href={product.link} className="block group-hover/product:shadow-2xl">

        <Image src={product.thumbnail} alt={product.title} width={200} className="object-cover object-left-top absolute h-full w-full inset-0" height={200} />

      </Link>

      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" ></div>

      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white" >

        {
          product.title
        }

      </h2>


    </motion.div>
  )

}