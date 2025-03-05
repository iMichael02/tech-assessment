import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HealthDeclarePage from '../HealthDeclarePage';
import axios from 'axios';
import { notification } from 'antd';

jest.mock('axios');
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('src/constants/index.ts', () => ({
  BASE_API_URL: 'http://localhost:3000',
  HOST: '0.0.0.0',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('HealthDeclarePage', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the form correctly', () => {
    render(
      <Wrapper>
        <HealthDeclarePage />
      </Wrapper>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Symptoms/i)).toHaveLength(2);
    expect(screen.getByText(/Have you been in contact/i)).toBeInTheDocument();
  });

  it('submits the form successfully with contact info true', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    render(
      <Wrapper>
        <HealthDeclarePage />
      </Wrapper>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Temperature/i), {
      target: { value: '37' },
    });
    fireEvent.click(screen.getByLabelText(/Cough/i));
    fireEvent.click(screen.getByLabelText(/Yes/i));
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/health-declaration',
        expect.objectContaining({
          name: 'John Doe',
          temperature: 37,
          symptoms: ['cough'],
          contactedWithCovid19Suspects: true,
        })
      );
    });

    await waitFor(() => {
      expect(notification.success).toHaveBeenCalledWith({
        message: 'Submission Successful',
        description: 'Form submitted successfully!',
        placement: 'topRight',
      });
    });
  });

  it('submits the form successfully with contact info false', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    render(
      <Wrapper>
        <HealthDeclarePage />
      </Wrapper>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Temperature/i), {
      target: { value: '37' },
    });
    fireEvent.click(screen.getByLabelText(/Cough/i));
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/health-declaration',
        expect.objectContaining({
          name: 'John Doe',
          temperature: 37,
          symptoms: ['cough'],
          contactedWithCovid19Suspects: false,
        })
      );
    });

    await waitFor(() => {
      expect(notification.success).toHaveBeenCalledWith({
        message: 'Submission Successful',
        description: 'Form submitted successfully!',
        placement: 'topRight',
      });
    });
  });

  it('handles form submission error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Submission failed'));

    render(
      <Wrapper>
        <HealthDeclarePage />
      </Wrapper>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Temperature/i), {
      target: { value: '37' },
    });
    fireEvent.click(screen.getByLabelText(/Cough/i));
    fireEvent.click(screen.getByLabelText(/Yes/i));
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/health-declaration',
        expect.objectContaining({
          name: 'John Doe',
          temperature: 37,
          symptoms: ['cough'],
          contactedWithCovid19Suspects: true,
        })
      );
    });

    await waitFor(() => {
      expect(notification.error).toHaveBeenCalledWith({
        message: 'Submission failed',
        description: 'Failed to submit. Please try again.',
        placement: 'topRight',
      });
    });
  });
});
