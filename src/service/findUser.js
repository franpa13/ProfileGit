import axios from "axios";
import useStore from "../store/use-store";




export const findUser = async (username) => {
  try {
    console.log(`Fetching data for user: ${username}`);
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const dataRes = response.data;

    const setData = useStore.getState().setData;
    setData(dataRes);
  } catch (e) {
    if (e.response && e.response.status === 404) {
      console.error(`User ${username} not found`);
    } else {
      console.error(e);
    }
  }
};
