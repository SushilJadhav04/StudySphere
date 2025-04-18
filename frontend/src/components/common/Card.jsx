// src/components/common/Card.jsx
import React from "react";
import { motion } from "framer-motion";

const Card = ({ question, answer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-full sm:w-[22rem] bg-white dark:bg-neutral-900 text-black dark:text-white shadow-md dark:shadow-neutral-800 rounded-2xl p-6 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
    >
      <p className="text-base font-bold mb-2 text-neutral-800 dark:text-white">
        Q: {question}
      </p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        A: {answer}
      </p>
    </motion.div>
  );
};

export default Card;
