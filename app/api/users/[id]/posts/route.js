import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    // console.log("prompts");
    await connectToDB();
    const id = (await params).id;
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    // console.log(prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
