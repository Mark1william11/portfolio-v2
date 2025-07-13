import React from 'react';
import { Container, Title, Text, Button, Group, Tabs, Paper, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Scene from './components/Scene3D/Scene'; // Import the 3D Scene

// Import all your page sections
import About from "./pages/About/About";
import CareerTimeline from './pages/Timeline/Timeline';
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import Contact from './pages/Contact/Contact';

// Import hooks and icons
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaProjectDiagram, FaRoute, FaCode, FaEnvelope } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* The 3D Scene is now the official background */}
      <div className="scene-container">
        <Scene />
      </div>

      {/* The content-overlay ensures everything else sits on top */}
      <div className="content-overlay">
        <ToastContainer theme="dark" position="bottom-right"/>

        {/* Hero Section */}
        <div className="hero-section">
          <Container size="md" className="hero-content">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <img src="/images/profile.jpg" alt="Mark William" className="profile-picture"/>
            </motion.div>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Title order={1} className="hero-title">Mark William</Title>
              <Text size="xl" c="yellow.5" className="hero-subtitle">
                <Typewriter options={{ strings: ["Mobile Developer", "FullStack Developer", "Creative Problem Solver"], autoStart: true, loop: true }}/>
              </Text>
            </motion.div>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Group mt="lg" justify="center">
                <Button
                  component={motion.a} // This tells Mantine to render as a motion-powered <a> tag
                  href="https://github.com/Mark1william11"
                  target="_blank"
                  rel="noopener noreferrer" // Important for security
                  variant="default"
                  leftSection={<BsGithub size={14} />}
                  size="md"
                  // Framer Motion props now work directly on the button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  GitHub
                </Button>
                <Button
                  component={motion.a} // Same technique here
                  href="https://www.linkedin.com/in/mark-william-92694b219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  leftSection={<BsLinkedin size={14} />}
                  // Framer Motion props now work directly on the button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  LinkedIn
                </Button>
              </Group>
            </motion.div>
          </Container>
        </div>

        {/* Content Hub (Tabs) */}
        <div className="content-hub">
          <Tabs defaultValue="projects" variant="pills" radius="xl" orientation="vertical">
            <Tabs.List className="tabs-list">
              <Tabs.Tab value="projects" c="white" leftSection={<FaProjectDiagram />}>Projects</Tabs.Tab>
              <Tabs.Tab value="journey" c="white" leftSection={<FaRoute />}>Journey</Tabs.Tab>
              <Tabs.Tab value="skills" c="white" leftSection={<FaCode />}>Skills</Tabs.Tab>
              <Tabs.Tab value="contact" c="white" leftSection={<FaEnvelope />}>Contact</Tabs.Tab>
            </Tabs.List>

            <div className="tabs-panel-wrapper">
              <Tabs.Panel value="projects"><Projects /></Tabs.Panel>
              <Tabs.Panel value="journey"><CareerTimeline /></Tabs.Panel>
              <Tabs.Panel value="skills">
                <Stack gap="xl">
                  <Paper><About /></Paper>
                  <Paper><Techstack /></Paper>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="contact"><Contact /></Tabs.Panel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;