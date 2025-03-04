import { render, screen, waitFor, act } from '@testing-library/react';
import MenuStartPage from '@/app/Components/MenuStartPage';
import { useApi } from '@/context/ApiContext';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href} data-testid="pizza-link">{children}</a>;
  };
});

jest.mock('@/context/ApiContext', () => ({
  useApi: jest.fn(),
}));

describe('MenuStartPage', () => {
  const mockPizzas = [
    {
      id: '1',
      properties: {
        pizzaName: 'Margherita',
        ingridienser: ['Tomatsås', 'Mozzarella', 'Basilika'],
        pizzaPrice: 95
      }
    },
    {
      id: '2',
      properties: {
        pizzaName: 'Pepperoni',
        ingridienser: ['Tomatsås', 'Mozzarella', 'Pepperoni'],
        pizzaPrice: 105
      }
    }
  ];

  const mockFetchPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      fetchPage: mockFetchPage
    });
  });

  test('renders pizza list when API call succeeds', async () => {
    mockFetchPage.mockResolvedValue(mockPizzas);
    
    await act(async () => {
      render(<MenuStartPage />);
    });
    
    expect(screen.getByText('Pizzor')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    expect(screen.getByText('Tomatsås, Mozzarella, Basilika')).toBeInTheDocument();
    expect(screen.getByText('Tomatsås, Mozzarella, Pepperoni')).toBeInTheDocument();
    expect(screen.getByText('95:-')).toBeInTheDocument();
    expect(screen.getByText('105:-')).toBeInTheDocument();
    
    const links = screen.getAllByTestId('pizza-link');
    expect(links).toHaveLength(2);
  });

  test('handles empty pizza list gracefully', async () => {
    mockFetchPage.mockResolvedValue([]);
    
    await act(async () => {
      render(<MenuStartPage />);
    });
    expect(screen.getByText('Pizzor')).toBeInTheDocument();
    expect(screen.queryAllByTestId('pizza-link')).toHaveLength(0);
  });

  test('handles API failure gracefully', async () => {
    mockFetchPage.mockResolvedValue(null);
    
    await act(async () => {
      render(<MenuStartPage />);
    });
    
    expect(screen.getByText('Pizzor')).toBeInTheDocument();
    expect(screen.queryAllByTestId('pizza-link')).toHaveLength(0);
  });

  test('renders pizza without ingredients correctly', async () => {
    const pizzasWithMissingIngredients = [
      {
        id: '3',
        properties: {
          pizzaName: 'Special',
          pizzaPrice: 120
        }
      }
    ];
    
    mockFetchPage.mockResolvedValue(pizzasWithMissingIngredients);
    
    await act(async () => {
      render(<MenuStartPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Special')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Inga ingredienser angivna')).toBeInTheDocument();
    expect(screen.getByText('120:-')).toBeInTheDocument();
  });
});