import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Container, Title, Text, Grid, Paper, TextInput, Textarea, Button, Group, ActionIcon, Stack, Loader } from '@mantine/core';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !msg) {
        toast.error("Please provide all fields");
        return;
      }
      setLoading(true);
      const { data } = await axiosInstance.post("/api/v1/portfolio/sendEmail", { name, email, msg });
      setLoading(false);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setMsg("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
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