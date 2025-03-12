import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Brutalist Design System',
  description: 'A preview of all components in the brutalist design system',
};

export default function DesignSystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="design-system-layout">
      {children}
    </div>
  );
} 