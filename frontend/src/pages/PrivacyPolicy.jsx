import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 1.5rem;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const PrivacyPolicyContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px 30px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 25px;
`;

const Section = styled.section`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 12px;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #cccccc;
  margin-bottom: 15px;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #bbbbbb;
  margin-bottom: 8px;
  position: relative;
  padding-left: 18px;

  &::before {
    content: "•";
    color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <PrivacyPolicyWrapper>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <PrivacyPolicyContainer>
        <Title>Privacy Policy for StudySphere</Title>
        <Paragraph>Last updated: March 23, 2025</Paragraph>

        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This policy outlines the types of information we collect, how we use it, and your rights regarding your data.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Information We Collect</SectionTitle>
          <Paragraph>We may collect the following types of information:</Paragraph>
          <List>
            <ListItem>
              <strong>Personal Information:</strong> This includes any information that identifies you personally, such as your name, email address, phone number, and mailing address.
            </ListItem>
            <ListItem>
              <strong>Usage Data:</strong> We may collect data about how you access and use our services. This can include your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
            </ListItem>
            <ListItem>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to monitor activity on our services and store certain information.
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. How We Use Your Information</SectionTitle>
          <Paragraph>We use the collected information for various purposes:</Paragraph>
          <List>
            <ListItem>To provide and maintain our services</ListItem>
            <ListItem>To notify you about changes to our services</ListItem>
            <ListItem>To allow you to participate in interactive features when you choose to do so</ListItem>
            <ListItem>To provide customer support</ListItem>
            <ListItem>To gather analysis or valuable information so that we can improve our services</ListItem>
            <ListItem>To monitor the usage of our services</ListItem>
            <ListItem>To detect, prevent, and address technical issues</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Disclosure of Personal Information</SectionTitle>
          <Paragraph>We may share your personal information in the following situations:</Paragraph>
          <List>
            <ListItem>
              <strong>With Service Providers:</strong> We may share your personal data with service providers to monitor and analyze the use of our services or to contact you.
            </ListItem>
            <ListItem>
              <strong>For Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your personal data may be transferred.
            </ListItem>
            <ListItem>
              <strong>Legal Requirements:</strong> We may disclose your personal information if required to do so by law.
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Security of Your Information</SectionTitle>
          <Paragraph>
            The security of your personal information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </Paragraph>
        </Section>
      </PrivacyPolicyContainer>
    </PrivacyPolicyWrapper>
  );
};

export default PrivacyPolicy;
