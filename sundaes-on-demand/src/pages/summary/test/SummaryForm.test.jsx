import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

// checkbox enables a button
//  - Initial: unchecked, button disabled
//  - checkbox checked, button enabled
//  - unchecking disables button
// -Render summaryForm component
// - find CB using name, look at mockup
// - Red-green; fail first
// - Do not code the component
// - Separate into separate tests
test("Initial Condition", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
  // Initial
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables on first click and disables button on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

  // Check Checkbox
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // Unclick Checkbox
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
