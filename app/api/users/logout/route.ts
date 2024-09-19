import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Correct way to delete the cookie by setting an expiration date in the past
    response.cookies.set({
      name: "token",
      value: "",
      path: "/", // Ensure the path matches
      httpOnly: true, // Match the flags used during login
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
