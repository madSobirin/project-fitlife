import { data } from "./data";
export async function GET() {
  return Response.json({
    status: 200,
    message: "success ini dari Get",
    data,
  });
}
