import React, { useRef } from 'react'; // Import useRef
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; // Import motion hooks
import { Container, Title, Text, SimpleGrid, Paper, ThemeIcon, rem } from '@mantine/core';
import { TechstackList } from '../../utils/TechstackList';
import './Techstack.css';

const TechCard = ({ tech, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Animation for entrance
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className="motion-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.04 + (index || 0) * 0.07 }}
      viewport={{ once: true }}
    >
      <Paper withBorder radius="md" p="sm" className="tech-card">
        <ThemeIcon
          size={60}
          radius={60}
          variant="gradient"
          gradient={{ from: tech.gradientFrom || 'blue', to: tech.gradientTo || 'cyan', deg: 90 }}
        >
          <tech.icon style={{ width: rem(32), height: rem(32) }} />
        </ThemeIcon>
        <Text ta="center" mt="sm" fw={500}>{tech.name}</Text>
      </Paper>
    </motion.div>
  );
};


const Techstack = () => {
  return (
    <div className="techstack-section" id="techstack">
      <Container size="lg" py="xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Title order={2} ta="center" mb="lg">
            Technologies Stack
          </Title>
          <div className="section-divider"></div>
        </motion.div>
        <Text ta="center" mb="xl">
          👉 Including programming languages, frameworks, databases, front-end and back-end tools, and APIs.
        </Text>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="xl" style={{ perspective: '1000px' }}>
          {TechstackList.map((tech, i) => (
            <TechCard key={tech._id} tech={tech} index={i} />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Techstack;