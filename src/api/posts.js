import axios from "axios";

export async function getTodo() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await axios.get("http://localhost:3000/posts");
    return { data, ts: Date.now() }; // Return the fetched data
  } catch (error) {
    // Throw the error so React Query can handle it
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export async function createTodo(text) {
  try {
    const { data } = await axios.post("http://localhost:3000/posts", {
      title: text,
      body: "body",
      userId: 1,
      id: Date.now(),
    });

    return data;
  } catch (error) {
    throw new Error(`Error creating todo: ${error.message} , `);
  }
}

export function getPostsPaginated(page) {
  return axios
    .get("http://localhost:3000/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then((res) => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      };
    });
}

export function getPost(id) {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data);
}
