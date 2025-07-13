import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Import the new library
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Container, Title, Text, Grid, Paper, TextInput, Textarea, Button, Group, ActionIcon, Stack, Loader } from '@mantine/core';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // These names MUST match the variables in your EmailJS template (e.g., {{name}})
    const templateParams = {
      name: form.current.name.value,
      email: form.current.email.value,
      msg: form.current.msg.value,
    };

    if (!templateParams.name || !templateParams.email || !templateParams.msg) {
        toast.error("Please provide all fields");
        setLoading(false);
        return;
    }

    emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
          console.log(result.text);
          toast.success("Your message sent successfully!");
          form.current.reset(); // Reset the form fields
          setLoading(false);
      }, (error) => {
          console.log(error.text);
          toast.error("Failed to send message. Please try again later.");
          setLoading(false);
      });
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
                <form ref={form} onSubmit={handleSubmit}>
                  <Stack>
                      <TextInput name="name" withAsterisk label="Your Name" placeholder="John Doe" size="md"/>
                      <TextInput name="email" withAsterisk label="Your Email" placeholder="your.email@provider.com" size="md"/>
                      <Textarea name="msg" withAsterisk label="Your Message" placeholder="I'd like to talk about..." minRows={4} size="md"/>
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