import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/servers";

test("Handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

// .skip skips a particular test (runs all tests minus the skipped test), .only runs only a particular test (1 test)
test.skip("not a real test", () => {});