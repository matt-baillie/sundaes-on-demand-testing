import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // flow: initial subTotal $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // flow: add 1 option(vanilla) and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // flow: update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update topping subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // inital subtotal; 0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // One option checked

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // 2nd option checked
  const hotFudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  // await user.clear(hotFudgeCheckbox);
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // remove one option
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00 and updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
