import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import BookingModel from "../../../../lib/models/BookingModel";
export async function POST(req, res) {
  await connectMongodb();
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get("id");
  await BookingModel.findOneAndDelete({ tran_id: tran_id });
  return NextResponse.redirect(new URL("/fail", req.url), 303);
}
