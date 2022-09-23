export async function getData(query) {
  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=deokzgUjxm6QHQdp3H3aca1LSZcCpucc&q=${query}&limit=25&offset=0&rating=Y&lang=en`
    );
    return res.json();
  } catch (e) {
    throw new Error("Invalid response");
  }
}
