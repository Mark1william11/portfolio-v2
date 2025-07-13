import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Container, Title, Text, Grid, Paper, TextInput, Textarea, Button, Group, ActionIcon, Stack, Loader } from '@mantine/core';
import { BsGithub, BsLinkedin } from "react-icons/bs";

// We can delete Contact.css if it's empty or only has the .contact-image rule,
// as we can handle that with inline styles or Mantine props.
// import './Contact.css'; 

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !msg) {
      toast.error("Please provide all fields");
      setLoading(false);
      return;
    }

    try {
      // THE FIX: We check the HTTP status code directly.
      const response = await axiosInstance.post("/api/v1/portfolio/sendEmail", { name, email, msg });

      if (response.status === 200) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setMsg("");
      } else {
        // This will handle cases where the server sends a success=false message but not an error status
        toast.error(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      // This will catch network errors or if the server returns a 500/400 status
      console.error("Contact form submission error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong on the server.");
    } finally {
      // This will run no matter what, ensuring the loader always stops.
      setLoading(false);
    }
  };

  return (
    <div id="contact">
      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="lg">Contact Me</Title>
        <div className="section-divider"></div>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper withBorder p="xl" radius="md" className="contact-info-paper" style={{ height: '100%' }}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Stack align="center" gap="lg">
                  <Title order={3}>Let's Connect!</Title>
                  <img src="/images/contact-us.jpg" alt="contact" className="contact-image" />
                  <Text ta="center">I'm always open to discussing new projects, creative ideas, or opportunities.</Text>
                  <Group>
                    <ActionIcon component="a" href="https://www.linkedin.com/in/mark-william-92694b219/" target="_blank" rel="noopener noreferrer" size="lg" variant="default" radius="xl"><BsLinkedin size={22} /></ActionIcon>
                    <ActionIcon component="a" href="https://github.com/Mark1william11" target="_blank" rel="noopener noreferrer" size="lg" variant="default" radius="xl"><BsGithub size={22} /></ActionIcon>
                  </Group>
                </Stack>
              </motion.div>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper withBorder shadow="md" p="xl" radius="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Stack style={{ flexGrow: 1 }}>
                    <TextInput withAsterisk label="Your Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} size="md"/>
                    <TextInput withAsterisk label="Your Email" placeholder="your.email@provider.com" value={email} onChange={(e) => setEmail(e.target.value)} size="md"/>
                    <Textarea withAsterisk label="Your Message" placeholder="I'd like to talk about..." minRows={4} value={msg} onChange={(e) => setMsg(e.target.value)} size="md"/>
                  </Stack>
                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    disabled={loading}
                    leftSection={loading ? <Loader color="white" size="xs" /> : null}
                    fullWidth
                    style={{ marginTop: "48px", alignSelf: "flex-end" }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </motion.div>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Contact;