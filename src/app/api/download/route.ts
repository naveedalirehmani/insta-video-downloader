import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    const decodedUrl = decodeURIComponent(url as string);

    const axiosResponse: AxiosResponse = await axios.get(decodedUrl, {
      responseType: "stream",
    });

    return new NextResponse(axiosResponse.data, {
      status: 200,
      headers: {
        "Content-Type": axiosResponse.headers["content-type"],
        "Content-Length": axiosResponse.headers["content-length"],
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}