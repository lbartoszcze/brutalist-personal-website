import React from 'react';
import { Button } from './Buttons';

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  isFull?: boolean;
  hasGap?: boolean;
  isAttached?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  size = 'medium',
  variant = 'primary',
  isFull = false,
  hasGap = false,
  isAttached = true,
  className = '',
}) => {
  // Create a map of child props
  const childrenWithProps = React.Children.map(children, child => {
    // Check if the child is a valid React element
    if (React.isValidElement(child)) {
      // Pass props to Button components only
      if (child.type === Button) {
        return React.cloneElement(child as React.ReactElement<any>, { 
          size,
          variant,
          className: `
            ${orientation === 'horizontal' && isAttached ? 'first:border-r-0 last:border-l-0 [&:not(:first-child):not(:last-child)]:border-x-0' : ''}
            ${orientation === 'vertical' && isAttached ? 'first:border-b-0 last:border-t-0 [&:not(:first-child):not(:last-child)]:border-y-0' : ''}
            ${child.props.className || ''}
          `
        });
      }
    }
    return child;
  });

  return (
    <div 
      className={`
        flex
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${isFull ? 'w-full' : ''}
        ${hasGap ? orientation === 'horizontal' ? 'gap-2' : 'gap-2' : 'gap-0'}
        ${className}
      `}
    >
      {childrenWithProps}
    </div>
  );
};

export const OutlinedButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2"></div>
      <div className="relative z-10 border-2 border-black bg-white">
        <ButtonGroup {...props} />
      </div>
    </div>
  );
};

export const ButtonGroups: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Button Groups</h2>
      <p className="mb-8 font-sans">
        Grouped buttons with brutalist styling, providing flexible options for orientation and attachment.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Horizontal Button Groups</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-mono">Attached:</p>
              <ButtonGroup>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">With Gap:</p>
              <ButtonGroup hasGap isAttached={false}>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Secondary Variant:</p>
              <ButtonGroup variant="secondary">
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Vertical Button Groups</h3>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="mb-2 text-sm font-mono">Attached:</p>
              <ButtonGroup orientation="vertical">
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </ButtonGroup>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">With Gap:</p>
              <ButtonGroup orientation="vertical" hasGap isAttached={false}>
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </ButtonGroup>
            </div>
            
            <div>
              <p className="mb-2 text-sm font-mono">Secondary Variant:</p>
              <ButtonGroup orientation="vertical" variant="secondary">
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Full Width Button Groups</h3>
          <div className="space-y-4 max-w-md">
            <ButtonGroup isFull>
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </ButtonGroup>
            
            <ButtonGroup orientation="vertical" isFull>
              <Button>Top</Button>
              <Button>Middle</Button>
              <Button>Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Outlined Button Groups</h3>
          <div className="space-y-8">
            <OutlinedButtonGroup>
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </OutlinedButtonGroup>
            
            <div>
              <OutlinedButtonGroup orientation="vertical">
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </OutlinedButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 