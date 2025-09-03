import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = `
    flex items-center
    bg-transparent text-white
    cursor-pointer
    font-sans font-bold
    no-underline uppercase
    outline-none border-0
    relative
    transition-all duration-300
    animated-button
  `;

  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-xl', 
    lg: 'text-lg px-6 py-5'
  };

  const variantClasses = {
    default: 'text-black hover:text-gray-200',
    outline: 'text-black border border-white hover:bg-white hover:text-black',
    dark: 'bg-transparent !text-black hover:text-[#DBDBDB] tracking-wider'
  };

  return (
    <button 
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
