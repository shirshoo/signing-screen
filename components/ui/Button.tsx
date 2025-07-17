import { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({ 
  onPress, 
  children, 
  variant = 'primary', 
  disabled = false,
  loading = false,
  className = ''
}: ButtonProps) {
  const baseStyles = 'py-3.5 px-6 rounded-xl flex-row items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-600 active:bg-gray-700',
    outline: 'border border-blue-600 active:bg-blue-50',
    danger: 'bg-red-600 active:bg-red-700'
  };

  const textStyles = {
    primary: 'text-white font-semibold text-base',
    secondary: 'text-white font-semibold text-base',
    outline: 'text-blue-600 font-semibold text-base',
    danger: 'text-white font-semibold text-base'
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabled ? 'opacity-40' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563EB' : 'white'} />
      ) : (
        <Text className={textStyles[variant]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
} 