import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };
  useEffect(() => {
    // setOrderNumber("123");
    axios.post("http://localhost:3030/order", {}).then((res) => {
      setOrderNumber(res.data.orderNumber);
    });
  }, []);

  if (!orderNumber) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions, nothing will happen now</p>
      <button onClick={() => handleClick()}>Create new order</button>
    </>
  );
};

export default OrderConfirmation;
