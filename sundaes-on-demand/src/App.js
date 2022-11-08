import { useState } from "react";
import Container from "react-bootstrap/container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  const pageChange = setOrderPhase;
  console.log(orderPhase);
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary and entry page need provider */}

        {orderPhase === "inProgress" ? (
          <OrderEntry pageChange={pageChange} />
        ) : (
          <OrderSummary pageChange={pageChange} />
        )}

        <OrderConfirmation />
      </OrderDetailsProvider>
      {/* Confirmation page does not */}
    </Container>
  );
}

export default App;
