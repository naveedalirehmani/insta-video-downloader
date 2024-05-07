import { NextResponse } from "next/server";
import { load } from "cheerio";
import {
  getPostGraphqlData,
  getPostIdFromUrl,
  getPostPageHTML,
} from "@/utils/helpers";
import { VideoInfo } from "@/types/global";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const postUrl = body.url;
    if (!postUrl) {
      return NextResponse.json(
        {
          message: "Post Url is required",
        },
        { status: 400 }
      );
    }

    const postId = getPostIdFromUrl(postUrl);
    if (!postId) {
      return NextResponse.json(
        {
          message: "Invalid Post URL",
        },
        { status: 400 }
      );
    }

    try {
      const postJson = await getVideoInfo(postId);

      const response = {
        status: "success",
        data: {
          postUrl,
          ...postJson,
        },
      };
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      if (error?.code === "ENOTFOUND") {
        return handlerErrorResponse(
          "Network error, check your internet connection and try again"
        );
      } else if (error.name === "SecurityError") {
        return handlerErrorResponse(
          "We are having issues connecting to the server. Please try again later"
        );
      }
      return handlerErrorResponse("Unexpected Error");
    }
  } catch (error) {
    console.error("Error fetching Instagram post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function handlerErrorResponse(message: string) {
  return NextResponse.json(
    {
      message,
    },
    { status: 500 }
  );
}

const getVideoInfo = async (postId: string) => {
  let videoInfo: VideoInfo | null = null;

  if (true) {
    videoInfo = await getVideoJsonFromHTML(postId);
    if (videoInfo) return videoInfo;
  }

  if (true) {
    console.log("in graph");
    videoInfo = await getVideoJSONFromGraphQL(postId);
    if (videoInfo) return videoInfo;
  }
};

//TODO : helpers - need to refactor.

const getVideoJsonFromHTML = async (postId: string) => {
  const data = await getPostPageHTML({ postId });

  const postHtml = load(data);
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const videoInfo = formatPageJson(postHtml);
  return videoInfo;
};

const getVideoJSONFromGraphQL = async (postId: string) => {
  const data = await getPostGraphqlData({ postId });

  const mediaData = data.data?.xdt_shortcode_media;

  if (!mediaData) {
    return null;
  }

  if (!mediaData.is_video) {
    throw new Error("This post is not a video");
  }

  const videoInfo = formatGraphqlJson(mediaData);
  return videoInfo;
};

const formatPageJson = (postHtml: any) => {
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const videoUrl = videoElement.attr("content");
  if (!videoUrl) return null;

  const width =
    postHtml("meta[property='og:video:width']").attr("content") ?? "";
  const height =
    postHtml("meta[property='og:video:height']").attr("content") ?? "";

  const timeStamp = Math.floor(Date.now() / 1000).toString();
  const filename = `insta-online-${timeStamp}.mp4`;

  const videoJson: VideoInfo = {
    filename,
    width,
    height,
    videoUrl,
  };

  return videoJson;
};

const formatGraphqlJson = (data: any) => {
  const timeStamp = Math.floor(Date.now() / 1000).toString();
  const filename = `insta-online-g-${timeStamp}.mp4`;
  
  const width = data.dimensions.width.toString();
  const height = data.dimensions.height.toString();
  const videoUrl = data.video_url;

  const videoJson: VideoInfo = {
    filename,
    width,
    height,
    videoUrl,
  };

  return videoJson;
};
