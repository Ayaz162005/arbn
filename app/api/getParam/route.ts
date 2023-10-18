export default function GET(req: Request) {
  console.log(req, "fddfdf");

  return Response.json({ id: "sdsd" });
}
