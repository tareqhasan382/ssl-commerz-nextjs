import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    cus_name: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    tran_id: {
      type: String,
      required: true,
      unique: true,
    },
    payment_status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
    },
  },
  { timestamps: true }
);

const BookingModel =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default BookingModel;
