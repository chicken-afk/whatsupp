// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.pathname;

    console.log("url", url);
    console.log("token", token);

    // Guest Middleware: Redirect logged-in users from the login page ('/') to the roomchat page
    if (['/'].includes(url) && token) {
        return NextResponse.redirect(new URL('/roomchat', req.url)); // Redirect to roomchat if logged in
    }

    // Auth Middleware: Redirect unauthenticated users from protected pages ('/roomchat') to the login page ('/')
    if (['/roomchat'].includes(url) && !token) {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to login if not authenticated
    }

    return NextResponse.next(); // Allow access if conditions are met
}

// Apply middleware globally (or adjust as necessary)
export const config = {
    matcher: ['/', '/roomchat'], // Apply middleware to the home page and roomchat page
};
