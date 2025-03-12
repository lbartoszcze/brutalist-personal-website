'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
  updateCursorVariant?: (variant: string) => void;
}

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  external = false,
  updateCursorVariant,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Size variations
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  // Variant variations
  const variantClasses = {
    primary: 'bg-vandyke text-white hover:bg-vandyke/90 focus:ring-vandyke active:bg-vandyke/80 shadow-sm hover:shadow-md',
    secondary: 'bg-mindaro text-vandyke hover:bg-mindaro/90 focus:ring-mindaro active:bg-mindaro/80',
    outline: 'bg-transparent border-2 border-hunyadi text-vandyke hover:bg-hunyadi/10 focus:ring-hunyadi',
    text: 'bg-transparent text-vandyke hover:bg-vandyke/5 focus:ring-vandyke',
  };

  // Disabled styles
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';

  // Combine the classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  // Common props for all button/link variations
  const commonProps = {
    className: buttonClasses,
    onClick,
    onMouseEnter: () => updateCursorVariant && updateCursorVariant('button'),
    onMouseLeave: () => updateCursorVariant && updateCursorVariant('default'),
  };

  // Content with icon
  const content = (
    <>
      {loading ? (
        <span className="mr-2 inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}

      {children}

      {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Motion props
  const motionProps = {
    whileHover: { scale: disabled || loading ? 1 : 1.03 },
    whileTap: { scale: disabled || loading ? 1 : 0.98 },
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  };

  // Render link or button
  if (href) {
    const linkProps = external
      ? {
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : { href };

    return (
      <motion.div {...motionProps}>
        <Link {...linkProps} {...commonProps}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      {...commonProps}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
} 