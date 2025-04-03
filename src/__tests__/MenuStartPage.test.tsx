// src/__tests__/MenuStartPage.test.tsx

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MenuStartPage from "@/app/Components/MenuStartPage";
import { ApiProvider } from "@/context/ApiContext";

import "@testing-library/jest-dom";

// Mocka window.location.href
const mockLocation = { href: "" };
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true
});

// Mocka localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value;
    },
    removeItem: function(key: string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mocka Pizza-data
const mockPizzas = [
  {
    id: "pizza1",
    name: "Test Pizza 1",
    properties: {
      pizzaName: "Margherita",
      pizzaPrice: 85,
      ingridienser: ["Tomatsås", "Mozzarella", "Basilika"],
    },
  },
  {
    id: "pizza2",
    name: "Test Pizza 2",
    properties: {
      pizzaName: "Vesuvio",
      pizzaPrice: 95,
      ingridienser: ["Tomatsås", "Ost", "Skinka"],
    },
  },
];

// Mocka API för fetchPage
jest.mock("@/context/ApiContext", () => ({
  ...jest.requireActual("@/context/ApiContext"),
  useApi: () => ({
    fetchPage: jest.fn().mockImplementation(() => Promise.resolve(mockPizzas)),
    loading: false,
    error: null,
  }),
}));

describe("MenuStartPage", () => {
  beforeEach(() => {
    // Rensa localStorage och mockade URL:er före varje test
    window.localStorage.clear();
    mockLocation.href = "";
  });

  test("renders pizza list when API call succeeds", async () => {
    render(
      <ApiProvider>
        <MenuStartPage />
      </ApiProvider>
    );

    // Vänta på att pizzor laddas
    await waitFor(() => {
      expect(screen.getByText("Margherita")).toBeInTheDocument();
    });

    expect(screen.getByText("Vesuvio")).toBeInTheDocument();
    expect(screen.getByText("85:-")).toBeInTheDocument();
    expect(screen.getByText("95:-")).toBeInTheDocument();
  });

  test("handles empty pizza list gracefully", async () => {
    // Överskugga mockad implementation för detta test
    jest.spyOn(require("@/context/ApiContext"), "useApi").mockImplementation(() => ({
      fetchPage: jest.fn().mockResolvedValue([]),
      loading: false,
      error: null,
    }));

    render(
      <ApiProvider>
        <MenuStartPage />
      </ApiProvider>
    );

    // Eftersom vi inte renderar några pizzor, kontrollera att rubriken finns
    expect(screen.getByText("Pizzor")).toBeInTheDocument();
  });

  test("handles API failure gracefully", async () => {
    // Överskugga mockad implementation för detta test
    jest.spyOn(require("@/context/ApiContext"), "useApi").mockImplementation(() => ({
      fetchPage: jest.fn().mockResolvedValue(null),
      loading: false,
      error: "API Error",
    }));

    render(
      <ApiProvider>
        <MenuStartPage />
      </ApiProvider>
    );

    // Kontrollera att rubriken fortfarande renderas även vid fel
    expect(screen.getByText("Pizzor")).toBeInTheDocument();
  });

  test("renders pizza without ingredients correctly", async () => {
    // Modifiera en av pizzorna att sakna ingredienser
    const mockPizzasNoIngredients = [
      {
        ...mockPizzas[0],
        properties: {
          ...mockPizzas[0].properties,
          ingridienser: undefined,
        },
      },
      mockPizzas[1],
    ];

    // Överskugga mockad implementation för detta test
    jest.spyOn(require("@/context/ApiContext"), "useApi").mockImplementation(() => ({
      fetchPage: jest.fn().mockResolvedValue(mockPizzasNoIngredients),
      loading: false,
      error: null,
    }));

    render(
      <ApiProvider>
        <MenuStartPage />
      </ApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Margherita")).toBeInTheDocument();
    });

    // Kontrollera att fallback-text för ingredienser visas
    expect(screen.getByText("Inga ingredienser angivna")).toBeInTheDocument();
  });

  test("navigates to menu page with pizza ID when pizza is clicked", async () => {
    render(
      <ApiProvider>
        <MenuStartPage />
      </ApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Margherita")).toBeInTheDocument();
    });

    // Hitta första pizzan och klicka på den
    const firstPizza = screen.getByText("Margherita").closest('[data-testid="pizza-link"]');
    fireEvent.click(firstPizza!);

    // Kontrollera att localStorage uppdaterades med rätt ID
    expect(window.localStorage.getItem("selectedPizzaId")).toBe("pizza1");
    
    // Kontrollera att vi navigerar till rätt plats
    expect(window.location.href).toBe("/Menu");
  });
});