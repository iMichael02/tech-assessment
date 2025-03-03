import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorFallback from '../ErrorFallback';

describe('ErrorFallback', () => {
  it('renders the error message', () => {
    render(<ErrorFallback />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Oops! Somthing went wrong.')).toBeInTheDocument();
  });
});
