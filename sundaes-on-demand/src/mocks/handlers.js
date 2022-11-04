import { rest } from "msw";

export const handlers = [
  // handles a POST
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
        {
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
      ])
    );
  }),
];
