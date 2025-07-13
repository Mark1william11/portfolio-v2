import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
// Import Mantine components
import { Title, Text, Button, Group, Container } from '@mantine/core';

import "./home.css";

const Home = () => {
  // THE FIX IS HERE: Using object destructuring
  const { colorScheme } = useTheme();

  return (
    <div className="container-fluid home-container" id="home">
      <Container size="md" className="home-content">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text size="xl" mb="sm">Hi 👋 I'm a</Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mantine's Title component automatically handles theme colors */}
          <Title order={1} c={colorScheme === 'dark' ? 'yellow' : 'blue'} >
            <Typewriter
              options={{
                strings: [
                  "Mobile Developer!",
                  "FullStack Developer!",
                  "CS Student!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Group mt="xl">
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              component="a"
              href="#contact" // Link to the contact section
            >
              Hire Me
            </Button>
            <Button
              size="lg"
              variant="default"
              component="a"
              href="/Mark-William.pdf"
              download="Mark_William_Resume.pdf"
            >
              My Resume
            </Button>
          </Group>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;