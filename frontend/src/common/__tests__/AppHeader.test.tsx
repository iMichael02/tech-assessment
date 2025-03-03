import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../AppHeader';

describe('AppHeader', () => {
  it('renders the header with title and navigation links', () => {
    render(
      <BrowserRouter>
        <AppHeader />
      </BrowserRouter>
    );

    expect(screen.getByText('Health Care')).toBeInTheDocument();
    expect(screen.getByText('Declare Health')).toBeInTheDocument();
    expect(screen.getByText('Health Declaration List')).toBeInTheDocument();
  });
});
