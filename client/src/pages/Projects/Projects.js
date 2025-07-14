import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import { Container, Title, Text, SimpleGrid, Card, Badge, Button, Group } from '@mantine/core';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/api/v1/portfolio/get-projects");
        setProjects(data.projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    // We can add some inline styles or use Mantine's styling props for the section background
    <div id="projects" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
      <Container size="lg" py="xl">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
          <Title order={2} ta="center" mb="lg">
            Top Recent Projects
          </Title>
          <div className="section-divider"></div>
        </motion.div>
        <Text ta="center" mb="xl">
          Here are some of the projects I've worked on, showcasing my skills in mobile and web development. I'm always learning and eager to take on new challenges.
        </Text>

        {loading && <Text ta="center">Loading Projects...</Text>}
        {error && <Text ta="center" c="red">{error}</Text>}
        
        {!loading && !error && (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="xl"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{once: true}}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{height: '100%'}}>
                    <Card.Section>
                      <img
                        src={project.imageUrl}
                        height={160}
                        alt={project.title}
                        style={{ width: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Title order={4}>{project.title}</Title>
                    </Group>
                    
                    <Group gap="xs" mb="sm">
                        {project.tags.map(tag => <Badge key={tag} color="blue">{tag}</Badge>)}
                    </Group>

                    <Text size="sm" c="dimmed" style={{flexGrow: 1}}>
                      {project.description}
                    </Text>

                    <Button 
                      variant="light" 
                      color="blue" 
                      fullWidth 
                      mt="md" 
                      radius="md"
                      component="a"
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
        )}
      </Container>
    </div>
  );
};

export default Projects;