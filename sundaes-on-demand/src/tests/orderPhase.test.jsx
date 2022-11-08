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

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  await user.click(orderButton);

  // Check summary info is correct based on order
  // Accept terms & conditions and click button to confirm order
  // confirm order number on confirmation page
  // click new order button on confirmation page
  // check that scoops and toppings subtotals have been reset
  // do we need to await anything to avoid test errors?
});
