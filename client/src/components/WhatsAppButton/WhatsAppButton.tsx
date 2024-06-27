import './WhatsAppButton.css';




import React from 'react';

const WhatsAppButton: React.FC = () => {
  // const phoneNumber = '+1234567890'; // Замените на ваш номер телефона
  // const message = 'Hello'; // Предварительно набранное сообщение
  // const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
// const whatsappLink = 'https://api.whatsapp.com/message/23NUWWD3KD6KL1?autoload=1&app_absent=0';
  return (
    <a href={"https://api.whatsapp.com/message/23NUWWD3KD6KL1?autoload=1&app_absent=0"} target="_blank" rel="noopener noreferrer" className="fixed-whatsapp-icon">
      <img src= '../../src/assets/images/background/whatsapp.png'  />
    </a>
  );
};

export default WhatsAppButton;

