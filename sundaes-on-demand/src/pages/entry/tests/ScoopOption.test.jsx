import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("Input box is red when there is an invalid scoop count", async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  const vanillaInput = screen.getByRole("spinbutton");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
