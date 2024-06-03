import React from "react";
import "./EntradaInput.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import useStore from "../../store/use-store";
import { findUser } from "../../service/findUser";
import { traerRepos } from "../../service/repositories";

export default function EntradaInput() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const searchResults = useStore((state) => state.searchResults);
  const setSearchResults = useStore((state) => state.setSearchResults);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (user !== "") {
      findUser(user);
      traerRepos(user);
    }
    if (user === undefined || user === "" || !user) {
      findUser("github");
      traerRepos("github");
    }
  };

  return (
    <section className="relative">
      <img
        className="h-26 md:h-full"
        src="./hero-image-github-profile.png"
        alt=""
      />

      <form onSubmit={handleForm}>
        {/* <label  className="hidden md:block md:absolute text-white md:font-bold md:left-1/3 md:ml-6 md:top-4 " htmlFor="" >Username :</label> */}
        <TextField
          placeholder="Username"
          size="small"
          value={user}
          onChange={handleChange}
          sx={{
            width: "30%",
            bgcolor: "white",
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            "@media screen and (max-width: 768px)": {
              width: "50%",
              top: "40%",
            },
          }}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "18px" }} />
              </InputAdornment>
            ),
            sx: {
              "& .MuiOutlinedInput-input": {
                padding: "6px",
              },
            },
          }}
        />
      </form>
    </section>
  );
}
