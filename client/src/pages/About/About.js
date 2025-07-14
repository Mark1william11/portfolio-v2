import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Text, Grid, Paper, Avatar } from '@mantine/core';
import './About.css';

const About = () => {
  return (
    <div className="about" id="about">
      <Container size="lg" py="xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Title order={2} ta="center" mb="lg">
            About Me
          </Title>
          <div className="section-divider"></div>
        </motion.div>

        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Avatar
                  src="https://media.licdn.com/dms/image/D4D03AQF_R1hROfXmYg/profile-displayphoto-shrink_400_400/0/1698337774207?e=1726099200&v=beta&t=x3zD-jG80aH03T2wS1Zf8bL2w2wY9G3o2a9C1XJ5H7k"
                  size={200}
                  radius="50%"
                  alt="Mark William"
                  mx="auto"
                  display="block"
                  style={{ border: '4px solid var(--mantine-color-blue-5)' }}
                />
              </motion.div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Text fz="lg" lh="xl">
                  Hello! I am a passionate and dedicated Mobile Developer with a laser 
                  focus on building beautiful, high-performance applications using 
                  **Flutter**. My academic background in Computer Science at E-JUST has 
                  provided me with a rock-solid foundation in software engineering 
                  principles.
                </Text>
                <Text fz="lg" mt="md" lh="xl">
                  I thrive on the challenge of translating complex problems into 
                  intuitive, elegant user experiences. From state management with 
                  Provider or BLoC to crafting pixel-perfect UIs that feel native 
                  on any device, my goal is to create apps that people love to use.
                </Text>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default About;