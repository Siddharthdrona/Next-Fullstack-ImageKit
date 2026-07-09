import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json();

    if(!email || !password) {
      return NextResponse.json(
        {error: "Email and Password are required"},
        {status: 400}
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return NextResponse.json(
        {error: "User Already Registered"},
        {status: 400}
      )
    }

    await User.create({
      email, 
      password
    })

    return NextResponse.json(
      {error: "User Registered Successfully"},
      {status: 400}
    );


  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      {error: "Failed to register User"},
      {status: 400}
    )
  }
}