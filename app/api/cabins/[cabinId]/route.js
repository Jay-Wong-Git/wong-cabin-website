import { getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  try {
    const cabin = await getCabin(params.cabinId);
    return Response.json(cabin);
  } catch (error) {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
