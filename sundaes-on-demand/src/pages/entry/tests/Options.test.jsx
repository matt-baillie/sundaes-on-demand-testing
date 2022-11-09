import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);

  expect(altText).toEqual(["Vanilla scoop", "Chocolate scoop"]);
});

test("Displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  //confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);

  expect(altText).toEqual([
    "Cherries topping",
    "Hot fudge topping",
    "M&Ms topping",
  ]);
});
test("No scoops subtotal update for invalid scoop count", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // What are we testing?
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  // test negative #
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-2");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // test # >10
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // test 3 with decimal
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3.5");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
  // scoops subtotal & scoopInput
});
