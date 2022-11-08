import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order phases for happy path", async () => {
  // render app
  const user = userEvent.setup();
  render(<App />);

  // Add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  await user.click(orderButton);

  // Check summary info is correct based on order
  // check heading(h2) summary
  const scoopHeading = screen.getByRole("heading", { name: /scoops: \$/i });
  expect(scoopHeading).toHaveTextContent("6.00");

  const toppingHeading = screen.getByRole("heading", { name: /toppings: \$/i });
  expect(toppingHeading).toHaveTextContent("1.50");
  // check individual lists of ingredients (getByText)
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // Accept terms & conditions and click button to confirm order
  // click checkbox, click button
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /i agree to the terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
  await user.click(termsCheckbox);
  expect(confirmButton).toBeEnabled();
  await user.click(confirmButton);

  // confirm order number on confirmation page
  const orderConfirmation = await screen.findByText(/your order number is/i);
  expect(orderConfirmation).toHaveTextContent("123455676");

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", /create new order/i);
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText(/scoops total: \$0.00/i);
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText(/toppings total: \$0.00/i);
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
