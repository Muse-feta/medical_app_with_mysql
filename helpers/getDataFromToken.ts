import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
  try {
    // Get cookies before async operations
    const cookies = req.cookies;
    const token = cookies.get("token")?.value || "";

    if (!token) {
      return null;
    }

    // JWT verification, this is async-safe
    const data = await new Promise((resolve, reject) => {
      try {
        const decoded = Jwt.verify(token, process.env.SECRET!);
        resolve(decoded);
      } catch (error) {
        reject(error);
      }
    });

    return data;
  } catch (error: any) {
    console.error("Error in getDataFromToken:", error.message);
    throw new Error(error.message);
  }
};
