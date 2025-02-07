/// <reference types="@testing-library/jest-dom" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/app/Components/Button"; // Uppdatera vägen om den skiljer sig

describe("Button Component", () => {
  test("renderar knappen med rätt label", () => {
    render(<Button label="Klicka här" onClick={() => {}} />);
    expect(screen.getByText("Klicka här")).toBeInTheDocument();
  });

  test("kör onClick-funktionen vid klick", async () => {
    const handleClick = jest.fn();
    render(<Button label="Tryck här" onClick={handleClick} />);

    const button = screen.getByText("Tryck här");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
