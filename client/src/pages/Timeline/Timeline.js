import React from 'react';
import { Timeline as MantineTimeline, Text, Title, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

// Data remains the same
const timelineData = [
  {
    type: 'work',
    title: 'Mobile App Developer Intern',
    company: 'Innovate Solutions Inc.',
    date: 'June 2023 - August 2023',
    description: 'Developed and maintained features for a flagship cross-platform mobile app using Flutter. Collaborated with a team of 5 to implement UI/UX designs and integrate REST APIs.',
  },
  {
    type: 'education',
    title: 'B.Sc. in Computer Science',
    company: 'Egypt-Japan University of Science and Technology (E-JUST)',
    date: '2021 - 2025 (Expected)',
    description: 'Specializing in Computer & Information Technology. Relevant coursework in Data Structures, Algorithms, Software Engineering, and Mobile Computing.',
  },
  {
    type: 'work',
    title: 'Freelance React Native Developer',
    company: 'Self-Employed',
    date: 'January 2023 - May 2023',
    description: 'Built a to-do list application from scratch for a client, focusing on a clean interface and state management with React Hooks.',
  }
];

const nodeVariants = (index) => ({
  hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, delay: 0.08 + index * 0.12, ease: "easeOut" }
  }
});

const CareerTimeline = () => {
  return (
    <div id="timeline">
      <Container size="lg" py="xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Title order={2} ta="center" mb="lg">
            My Journey
          </Title>
          <div className="section-divider"></div>
        </motion.div>
        <MantineTimeline
          active={timelineData.length}
          bulletSize={24}
          lineWidth={4}
          color="blue"
          // Add spacing between items via styles
          styles={{
            itemBody: { marginBottom: '32px' }, // space between stations
            itemBullet: { backgroundColor: 'var(--mantine-color-blue-5)' }, // blue bullets
            itemLine: { backgroundColor: 'var(--mantine-color-blue-5)' }, // blue line
          }}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              variants={nodeVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
              style={{ width: '100%' }}
            >
              <MantineTimeline.Item
                bullet={item.type === 'work' ? <FaBriefcase size={14} /> : <FaGraduationCap size={14} />}
                title={<Text fw={700} size="lg">{item.title}</Text>}
                // Add margin bottom for extra spacing between stations
                style={{ marginBottom: '32px' }}
              >
                <Text c="dimmed" size="sm">{item.company}</Text>
                <Text c="dimmed" size="xs" mt={4}>{item.date}</Text>
                {/* This text color will be inherited from the global style in App.css */}
                <Text mt="sm" fz="md">{item.description}</Text>
              </MantineTimeline.Item>
            </motion.div>
          ))}
        </MantineTimeline>
      </Container>
    </div>
  );
};

export default CareerTimeline;