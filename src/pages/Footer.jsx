import React from "react";
import { BookOpen, Award, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <BookOpen size={24} className="brand-icon" />
            <h3 className="brand-name">EduTutor Pro</h3>
          </div>
          <p className="brand-description">
            Professional tutoring and course registration system designed to
            help students achieve their academic goals.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">
            <Award size={20} className="section-icon" />
            Our Services
          </h4>
          <ul className="services-list">
            <li>• Online Course Registration</li>
            <li>• Academic Counseling</li>
            <li>• Progress Tracking</li>
            <li>• Personalized Learning</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Contact Information</h4>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:obedafatsaw@gmail.com" className="contact-link">
                obedafatsaw@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <span>+233 (201) 774-800</span>
            </div>
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>Available Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 EduTutor Pro. All rights reserved. | Professional Course
          Registration System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
