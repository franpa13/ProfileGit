import axios from "axios";
import useStore from "../store/use-store";
export const findLanguages = async ( nameUser, nameRepo) => {
    
  try {
    const setLanguages = useStore((state) => state.setLanguages);
    const response = await axios.get(
      `https://api.github.com/repos/${nameUser}/${nameRepo}/languages`
    );
    setLanguages(response.data);
  } catch (e) {
    console.log(e);
  }
};
