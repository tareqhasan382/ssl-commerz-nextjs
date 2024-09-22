"use client";
import React from "react";
import axios from "axios";

const CheckOut = () => {
  const PaymentOption = async () => {
    const data = {
      cus_name: "Tareq Hasan",
      product_name: "Shirt",
      price: 550,
    };

    try {
      const res = await axios.post("/api/payment", data);

      if (res.data?.GatewayPageURL) {
        window.location.replace(res.data.GatewayPageURL);
      } else {
        alert("Payment gateway URL is missing.");
      }
    } catch (error) {
      // Catch and handle errors
      console.error("Payment error:", error.response?.data || error.message);
      alert(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Check Out Page</h1>
      <button
        onClick={PaymentOption}
        className="px-4 py-2 bg-black rounded-md font-bold text-white"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckOut;
