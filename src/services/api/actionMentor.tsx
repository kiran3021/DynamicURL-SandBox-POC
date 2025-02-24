import axios from "axios";
export const getMentor = async ({ pageParam }) => {
  console.log({ pageParam });
  const { data } = await axios.get(
    `https://dummyjson.com/users?limit=10&skip=${(pageParam - 1) * 10}`
    // `https://dummyjson.com/users?limit=0`
  );
  const nextId = data ? data?.users[data?.users.length - 1].id + 1 : null;
  const previousId = data ? data?.users[0].id - 1 : null;

  return { data, nextId, previousId };
};

export const postMentor = async ({ formData }) => {
  try {
    const res = await axios.post('https://dummyjson.com/users/add', formData)
    console.log({ res })
    return res;
  } catch (error) {
    console.log({ error })
    throw error;
  }
};

export const getMentorDetails = async ({ id }) => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
    throw error;

  }
}
export const deleteMentor = async ({ id }) => {
  try {
    console.log(id)
    const res = await axios.delete(`https://dummyjson.com/users/${id}`);
    // const data = await getMentor({pageParam})
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const updateMentor = async ({ id, formData }) => {
  try {
    const res = await axios.patch(`https://dummyjson.com/users/${id}`, formData); // Send formData directly
    console.log("Updated Response:", res.data);
    return res.data;  // Return only data for cleaner usage
  } catch (error) {
    console.error("Update failed:", error);
    throw error; // Re-throw for handling errors in useMutation
  }
};
