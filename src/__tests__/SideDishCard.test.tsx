import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react'; 
import SideDishCard from '@/app/Components/SideDishCard';
import { useApi } from "@/context/ApiContext";
import { SideDish } from "@/types/sideDish";
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href} data-testid="side-dish-link">{children}</a>;
  };
});

jest.mock('@/context/ApiContext', () => ({
  useApi: jest.fn(),
}));

describe('SideDishCard', () => {
  const mockSideDishes: SideDish[] = [
    {
      id: '1',
      properties: {
        sideDishName: 'Vitlökssås',
        sideDishPrice: 15,
        sideDishCategory: 'saucesAndDips',
        sideDishIngredients: ['Vitlök, crème fraiche och majonnäs']
      }
    },
    {
      id: '2',
      properties: {
        sideDishName: 'Bearnaisesås',
        sideDishPrice: 15,
        sideDishCategory: 'saucesAndDips',
        sideDishIngredients: ['Ägg, senap, olja, vinäger, charlottenlök och persilja']
      }
    },
    {
      id: '3',
      properties: {
        sideDishName: 'Pizzasallad',
        sideDishPrice: 15,
        sideDishCategory: 'pizzasallad',
        sideDishIngredients: ['Vitkål, rapsolja och vitvinsvinäger']
      }
    },
    {
      id: '4',
      properties: {
        sideDishName: 'Vanliga pommes',
        sideDishPrice: 35,
        sideDishCategory: 'fries',
        sideDishIngredients: ['Potatis, friterade i rapsolja']
      }
    },
    {
      id: '5',
      properties: {
        sideDishName: 'Loaded fries',
        sideDishPrice: 65,
        sideDishCategory: 'loadedFries',
        sideDishIngredients: ['Pommes, smält cheddar, Jalapeños och hackad silverlök']
      }
    },
    {
      id: '6',
      properties: {
        sideDishName: 'Coleslaw',
        sideDishPrice: 15,
        sideDishCategory: 'coleslaw',
        sideDishIngredients: ['Rödkål, morot, silverlök, majonnäs, senap och citron']
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

  const renderWithAct = async (component: React.ReactElement) => {
    let result;
    await act(async () => {
      result = render(component);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    return result;
  };

  test('renders side dishes correctly when API call succeeds', async () => {
    mockFetchPage.mockResolvedValue(mockSideDishes);
    
    await renderWithAct(<SideDishCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Tillbehör')).toBeInTheDocument();
    });
    
    expect(mockFetchPage).toHaveBeenCalledWith('sideDishObj');
    
    expect(screen.getByText('SÅSER/DIP 15:-')).toBeInTheDocument();
    expect(screen.getByText('PIZZASALLAD 15 :-')).toBeInTheDocument();
    expect(screen.getByText('COLESLAW 15 :-')).toBeInTheDocument();
    expect(screen.getByText('Pommes 35:-')).toBeInTheDocument();
    expect(screen.getByText('LOADED FRIES 65:-')).toBeInTheDocument();
    
    expect(screen.getByText('Vitlökssås')).toBeInTheDocument();
    expect(screen.getByText('Bearnaisesås')).toBeInTheDocument();
    expect(screen.getByText('Pizzasallad')).toBeInTheDocument();
    expect(screen.getByText(/Vanliga pommes/)).toBeInTheDocument();
    expect(screen.getByText('Coleslaw')).toBeInTheDocument();
    
    const linkElement = screen.getByTestId('side-dish-link');
    expect(linkElement).toHaveAttribute('href', '/Menu');
  });

  test('handles empty side dishes array gracefully', async () => {
    mockFetchPage.mockResolvedValue([]);
    
    await renderWithAct(<SideDishCard />);
    
    expect(screen.getByText('Tillbehör')).toBeInTheDocument();
    expect(screen.getByText('No side dishes available')).toBeInTheDocument();
  });

  test('handles API failure gracefully', async () => {
    mockFetchPage.mockRejectedValue(new Error('API error'));
    
    await renderWithAct(<SideDishCard />);
    
    expect(screen.getByText('Failed to load side dishes. Please try again later.')).toBeInTheDocument();
  });

  test('renders side dish without ingredients correctly', async () => {
    const sideDishesWithMissingIngredients = [
      {
        id: '7',
        properties: {
          sideDishName: 'Special Dip',
          sideDishPrice: 20,
          sideDishCategory: 'saucesAndDips'
        }
      }
    ];
    
    mockFetchPage.mockResolvedValue(sideDishesWithMissingIngredients);
    
    await renderWithAct(<SideDishCard />);
    
    await waitFor(() => {
      expect(screen.getByText('Special Dip')).toBeInTheDocument();
    });
    
    // Testing if component handles missing ingredients
    expect(screen.getByText('SÅSER/DIP 15:-')).toBeInTheDocument();
  });

  test('properly categorizes side dishes', async () => {
    // Add side dish with unknown category to test standard categorisation
    const sideDishesWithUnknownCategory: SideDish[] = [
      ...mockSideDishes,
      {
        id: '8',
        properties: {
          sideDishName: 'Mystery Item',
          sideDishPrice: 20,
          sideDishCategory: 'unknownCategory'
        }
      }
    ];
    
    mockFetchPage.mockResolvedValue(sideDishesWithUnknownCategory);
    
    await renderWithAct(<SideDishCard />);
    
    expect(mockFetchPage).toHaveBeenCalledWith('sideDishObj');
    
    await waitFor(() => {
      expect(screen.getByText('SÅSER/DIP 15:-')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Vitlökssås')).toBeInTheDocument();
    expect(screen.getByText(/Vanliga pommes/)).toBeInTheDocument();
  });
});