import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };
  useEffect(() => {
    // setOrderNumber("123");
    axios
      .post("http://localhost:3030/order", {})
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);
  const newOrderButton = (
    <button onClick={() => handleClick()}>Create new order</button>
  );
  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }
  if (!orderNumber) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions, nothing will happen now</p>
      {newOrderButton}
    </>
  );
};

export default OrderConfirmation;
