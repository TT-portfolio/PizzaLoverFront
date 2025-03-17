import { act, render, screen } from "@testing-library/react"; 
import userEvent from "@testing-library/user-event"; 
import Navbar from "@/app/Components/Navbar"; 
import { usePathname } from "next/navigation"; 
import { axe, toHaveNoViolations } from "jest-axe"; 
import { CartProvider } from "@/context/CartContext";
import React, { ReactElement } from 'react'; // Import ReactElement type

expect.extend(toHaveNoViolations);

// Mock 'usePathname' to control active link in tests
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Helper function with proper TypeScript typing
const renderWithProviders = (ui: ReactElement) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

describe("Navbar Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders the navbar correctly", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Hem")).toBeInTheDocument();
    expect(screen.getByText("Meny")).toBeInTheDocument();
  });
  
  it("Has correct links", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Logo")).toHaveAttribute("href", "/");
    expect(screen.getByText("Hem")).toHaveAttribute("href", "/");
    expect(screen.getByText("Meny")).toHaveAttribute("href", "/Menu");
  });

  it("Highlight the active link", () => {
    (usePathname as jest.Mock).mockReturnValue("/Menu");
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Meny")).toHaveClass("active");
  });

  it("Opens and closes the mobile menu", async () => {
    renderWithProviders(<Navbar />);
    const user = userEvent.setup();

    // Simulate mobile view
    window.innerWidth = 320;
    window.dispatchEvent(new Event("resize"));

    // checking mobile view is not visable at test start
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    // Click to open hamburger menu
    const menuButton = screen.getByRole("button");
    await act(async () => {
      await user.click(menuButton);
    });
    
    // awaiting hamburger menu to open
    await screen.findByTestId("mobile-menu");

    // Checking if hamburger menu is in DOM
    expect(screen.getByTestId("mobile-menu")).toBeVisible();

    // Check if mobile-menu-link is visable and more then 0
    const menuLinks = await screen.findAllByTestId("mobile-menu-link");
    expect(menuLinks.length).toBeGreaterThan(0);

    // Check if both links are in mobile-menu
    const homeLink = screen.getAllByTestId("mobile-menu-link")[0];
    const menuLink = screen.getAllByTestId("mobile-menu-link")[1];
    
    expect(homeLink).toHaveAttribute("href", "/");
    expect(menuLink).toHaveAttribute("href", "/Menu");

    // Check if home is active in hamburger menu
    expect(homeLink).toHaveClass("active");
    expect(menuLink).not.toHaveClass("active");

    // click to close hamburger menu
    await act(async () => {
      await user.click(menuButton);
    });
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("Has no accessibility violations", async () => {
    const { container } = renderWithProviders(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});