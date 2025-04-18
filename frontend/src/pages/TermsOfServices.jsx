import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const TermsContainer = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 32px;
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 16px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: red;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 14px;
`;

const List = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
`;

const ListItem = styled.li`
  font-size: 0.95rem;
  margin-bottom: 6px;
`;

const Highlight = styled.span`
  font-weight: 600;
`;

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <TermsContainer>
      <CloseButton onClick={handleClose} aria-label="Close">
        <X size={20} />
      </CloseButton>
      <Title>Terms of Service</Title>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Welcome to StudySphere, an AI-powered educational platform using Google's Gemini API. 
          By using our services, you agree to these Terms and our Privacy Policy.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. AI Service Agreement</SectionTitle>
        <List>
          <ListItem>
            <Highlight>Gemini API Usage:</Highlight> All AI features use Google's Gemini API and follow Google's terms.
          </ListItem>
          <ListItem>
            <Highlight>Data Handling:</Highlight> Inputs may be processed to improve service quality.
          </ListItem>
          <ListItem>
            <Highlight>Prohibited Use:</Highlight>
            <List>
              <ListItem>Illegal or harmful content</ListItem>
              <ListItem>Mass data scraping</ListItem>
              <ListItem>Bypassing security</ListItem>
            </List>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. User Responsibilities</SectionTitle>
        <List>
          <ListItem>Keep your account secure</ListItem>
          <ListItem>Verify content accuracy</ListItem>
          <ListItem>Follow academic guidelines</ListItem>
          <ListItem>Report AI issues responsibly</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Intellectual Property</SectionTitle>
        <Paragraph>
          AI-generated content is under <Highlight>CC BY-NC 4.0</Highlight>. You own your input, and grant us processing rights.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Limitation of Liability</SectionTitle>
        <List>
          <ListItem>Content accuracy is not guaranteed</ListItem>
          <ListItem>Service interruptions may occur</ListItem>
          <ListItem>We’re not liable for misuse</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>6. Modifications</SectionTitle>
        <Paragraph>
          Terms may change with 30 days' notice. Continued use means acceptance.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Governing Law</SectionTitle>
        <Paragraph>
          These terms follow Indian law. Disputes are resolved via arbitration in Mumbai.
        </Paragraph>
      </Section>

      <Section>
        <Paragraph style={{ textAlign: "center" }}>
          Questions? Contact: <Highlight>contact@studysphere.in</Highlight>
        </Paragraph>
      </Section>
    </TermsContainer>
  );
};

export default TermsOfService;
