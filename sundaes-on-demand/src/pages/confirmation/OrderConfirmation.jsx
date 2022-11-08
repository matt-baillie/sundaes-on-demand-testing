import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = () => {
  const { resetOrder, setOrderPhase, orderPhase } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios.post("http://localhost:3030/order").then((res) => {
      console.log(res);
    });
  }, [orderNumber]);

  if (!orderNumber) {
    return "Loading";
  }
  return (
    <>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions, nothing will happen now</p>
      <button>Create new order</button>
    </>
  );
};

export default OrderConfirmation;
