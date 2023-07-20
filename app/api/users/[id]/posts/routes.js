import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const GET = async (req, { params }) => {
  const { id: userId } = params;
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: userId,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), {status: 200});
  } catch (error) {
    return new Response('Failed to fetch prompts', {status: 500});
  }
}