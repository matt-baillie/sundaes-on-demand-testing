import { render, screen } from "@testing-library/react";

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
    "M&Ms topping",
    "Hot fudge topping",
    "Cherries topping",
  ]);
});
