import { useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        Order Sundae!
      </button>
    </div>
  );
}
