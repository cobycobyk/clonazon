import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

const promise = loadStripe(
  "pk_test_51IQfQlLuJ1HeLhSPXklBS0xfmPdsHdn8PiERnJeV6rr0LSsSeqRQ9PUfChV5HMQbep9D5MZ6vZp1aDO6wHXCpPVG00YkMl32IK"
);

export default function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is ", authUser);
      if (authUser) {
        //user just logged in or user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <OrdersPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/checkout">
            <Header />
            <CheckoutPage />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <PaymentPage />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
