'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import Section from '@/components/layout/Section';

interface ContactSectionProps {
  updateCursorVariant: (variant: string) => void;
}

export default function ContactSection({ updateCursorVariant }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+1 (123) 456-7890',
      link: 'tel:+11234567890',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San+Francisco,+CA',
    },
  ];

  return (
    <Section
      id="contact-section"
      background="white"
      className="py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span
              className="inline-block px-4 py-1.5 bg-mindaro/20 text-vandyke rounded-full text-sm font-medium uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.span>

            <AnimatedHeading
              text="Let's Connect and Exchange Ideas"
              className="text-3xl md:text-4xl font-heading font-bold text-vandyke"
              delay={0.1}
            />

            <motion.p
              className="text-lg text-copper mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Interested in collaboration, research opportunities, or discussing innovative ideas? Reach out and I&apos;ll get back to you soon.
            </motion.p>
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-mindaro/20 flex items-center justify-center text-vandyke">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm text-copper">{item.label}</div>
                  <a
                    href={item.link}
                    className="text-vandyke font-medium hover:text-copper transition-colors"
                    target={item.label === 'Location' ? '_blank' : undefined}
                    rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => updateCursorVariant('link')}
                    onMouseLeave={() => updateCursorVariant('default')}
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="pt-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-heading font-semibold text-vandyke">Follow Me</h3>
            <div className="flex gap-4">
              {[
                { name: 'X', url: 'https://x.com/username' },
                { name: 'GitHub', url: 'https://github.com/username' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/username' },
                { name: 'Instagram', url: 'https://instagram.com/username' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-hunyadi/10 flex items-center justify-center text-vandyke hover:bg-mindaro/20 transition-colors"
                  whileHover={{ y: -3 }}
                  onMouseEnter={() => updateCursorVariant('link')}
                  onMouseLeave={() => updateCursorVariant('default')}
                  aria-label={social.name}
                >
                  {social.name.charAt(0)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-xl p-8 shadow-soft border border-hunyadi/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {submitSuccess ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-3 bg-mindaro/30 rounded-full mb-4">
                <svg className="w-10 h-10 text-vandyke" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-vandyke mb-2">Message Sent!</h3>
              <p className="text-copper mb-6">
                Thank you for reaching out. I&apos;ll review your message and respond shortly.
              </p>
              <Button
                onClick={() => setSubmitSuccess(false)}
                variant="outline"
                updateCursorVariant={updateCursorVariant}
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-vandyke">Send a Message</h3>
                <div className="h-1 w-16 bg-mindaro/40 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-vandyke mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-hunyadi/20 focus:outline-none focus:ring-2 focus:ring-mindaro focus:border-transparent"
                    required
                    onMouseEnter={() => updateCursorVariant('input')}
                    onMouseLeave={() => updateCursorVariant('default')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-vandyke mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-hunyadi/20 focus:outline-none focus:ring-2 focus:ring-mindaro focus:border-transparent"
                    required
                    onMouseEnter={() => updateCursorVariant('input')}
                    onMouseLeave={() => updateCursorVariant('default')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-vandyke mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-hunyadi/20 focus:outline-none focus:ring-2 focus:ring-mindaro focus:border-transparent resize-none"
                    required
                    onMouseEnter={() => updateCursorVariant('input')}
                    onMouseLeave={() => updateCursorVariant('default')}
                  ></textarea>
                </div>
              </div>

              {submitError && <div className="text-red-500 text-sm">{submitError}</div>}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
                updateCursorVariant={updateCursorVariant}
              >
                Send Message
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
} 