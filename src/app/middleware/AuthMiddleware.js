import { NextResponse } from "next/server";

export function authMiddleware(req) {
    const token = req.cookies.get("token")?.value;
    console.log("Middleware token", token);
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}