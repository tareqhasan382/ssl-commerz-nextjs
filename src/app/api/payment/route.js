import { NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";
import BookingModel from "../../../../lib/models/BookingModel";
import { connectMongodb } from "../../../../lib/mongodb";

export async function POST(req, res) {
  const tran_id = `tran_${Date.now()}`;

  try {
    // Ensure MongoDB is connected
    await connectMongodb();

    // Parse request body
    const data = await req.json();

    // Prepare payment data for SSLCommerz
    const sslData = {
      store_id: process.env.SSL_STORE_ID,
      store_passwd: process.env.SSL_STORE_PASS,
      total_amount: data.price,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${process.env.PUBLIC_URL}/api/success?id=${tran_id}`,
      fail_url: `${process.env.PUBLIC_URL}/api/fail?id=${tran_id}`,
      cancel_url: `${process.env.PUBLIC_URL}/api/cancel?id=${tran_id}`,
      ipn_url: `${process.env.PUBLIC_URL}/api/ipn?id=${tran_id}`,
      shipping_method: "Courier",
      product_name: data.product_name,
      product_category: "cloth",
      product_profile: "general",
      cus_name: data.cus_name,
      cus_email: "hasan@gmail.com",
      cus_add1: "Customer Address",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    // Make the payment initialization request
    const response = await axios({
      method: "post",
      url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
      data: querystring.stringify(sslData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response?.data?.GatewayPageURL) {
      const bookingData = {
        cus_name: "Tareq Hasan",
        product_name: "Shirt",
        price: 550,
        tran_id: tran_id,
      };

      await BookingModel.create(bookingData);

      return NextResponse.json({
        GatewayPageURL: response.data.GatewayPageURL,
        success: true,
      });
    } else {
      console.error("Payment initialization failed", response.data);
      return NextResponse.json({
        message: "Payment initialization failed",
        success: false,
      });
    }
  } catch (error) {
    // Catch and log any errors during the process
    console.error("Error creating booking or processing payment:", error);
    return NextResponse.json({
      message: "Error processing payment",
      error: error.message || error,
      success: false,
    });
  }
}
