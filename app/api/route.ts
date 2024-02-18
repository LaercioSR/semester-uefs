export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "SEMESTRE UEFS API!!!" }), {
    status: 200,
  });
}
