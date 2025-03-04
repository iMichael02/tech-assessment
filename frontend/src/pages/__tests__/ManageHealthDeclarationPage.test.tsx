import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManageHealthDeclarationPage from '../ManageHealthDeclarationPage';
import axios from 'axios';

jest.mock('axios');
jest.mock('src/constants/index.ts', () => ({
  BASE_API_URL: 'http://localhost:3000',
  HOST: '0.0.0.0',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('ManageHealthDeclarationPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders loading state initially', async () => {
    render(
      <Wrapper>
        <ManageHealthDeclarationPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it('renders error state on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <Wrapper>
        <ManageHealthDeclarationPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading data: Fetch failed/i)
      ).toBeInTheDocument();
    });
  });

  it('renders data correctly on fetch success', async () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        temperature: 37,
        symptoms: ['cough'],
        contactedWithCovid19Suspects: true,
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Wrapper>
        <ManageHealthDeclarationPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getAllByText((_, element) => {
          return element?.textContent === 'Manage Health Declaration';
        })[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText((_, element) => {
          return element?.textContent === 'John Doe';
        })[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText((_, element) => {
          return element?.textContent === '37';
        })[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText((_, element) => {
          return element?.textContent === 'cough';
        })[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText((_, element) => {
          return element?.textContent === 'Yes';
        })[0]
      ).toBeInTheDocument();
    });
  });

  it('handles edit and delete correctly', async () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        temperature: 37,
        symptoms: [],
        contactedWithCovid19Suspects: false,
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Wrapper>
        <ManageHealthDeclarationPage />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    const editButton = screen.getByTestId('edit-button-1');
    const deleteButton = screen.getByTestId('delete-button-1');

    fireEvent.click(editButton);
    expect(consoleLogSpy).toHaveBeenCalledWith('Edit record', mockData[0]);

    fireEvent.click(deleteButton);
    expect(consoleLogSpy).toHaveBeenCalledWith('Delete record', mockData[0]);

    consoleLogSpy.mockRestore();
  });
});
