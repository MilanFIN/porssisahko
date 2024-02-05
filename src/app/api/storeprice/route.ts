import { storeDayAheadData } from "@/app/actions";
import type { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    await storeDayAheadData();
    
    return new Response("ok", {
        status: 200,
    });
}
