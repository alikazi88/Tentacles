import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req: Request) => {
    return new Response(JSON.stringify({ module: "skills", status: "ready" }), {
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' }
    });
});
