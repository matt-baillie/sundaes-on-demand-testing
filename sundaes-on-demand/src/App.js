import Container from "react-bootstrap/container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { useOrderDetails } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary and entry page need provider */}
        <OrderEntry />
        <OrderSummary />
        <OrderConfirmation />
      </OrderDetailsProvider>
      {/* Confirmation page does not */}
    </Container>
  );
}

export default App;
