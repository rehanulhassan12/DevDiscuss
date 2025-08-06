import { NextResponse, NextRequest } from "next/server";
import getOrCreateDb from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function middleware(request: NextRequest) {
  try {
    await Promise.all([getOrCreateDb(), getOrCreateStorage()]);

    return NextResponse.next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error in middleware", error);
    }
    // throw new Error("Error in middleware");
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
