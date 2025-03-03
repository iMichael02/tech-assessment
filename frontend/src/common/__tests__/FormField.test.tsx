import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import FormField from '../FormField';

type WrapperProps = {
  label: string;
  name: string;
  type: string;
  required: boolean;
};

const Wrapper: React.FC<WrapperProps> = ({ label, name, type, required }) => {
  const { control } = useForm();
  return (
    <form>
      <FormField
        label={label}
        name={name}
        type={type}
        required={required}
        control={control}
      />
    </form>
  );
};

describe('FormField', () => {
  it('renders the label and input field', () => {
    render(<Wrapper label='Name' name='name' type='text' required />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
  });

  it('renders the input field with the correct type', () => {
    render(<Wrapper label='Age' name='age' type='number' required />);

    expect(screen.getByLabelText('Age')).toHaveAttribute('type', 'number');
  });
});
