import React, { useEffect } from "react";
import "./EntradaInput.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import debounce from "lodash/debounce";
import axios from "axios";
import useStore from "../../store/use-store";
import { findUser } from "../../service/findUser";
import { traerRepos } from "../../service/repositories";

export default function EntradaInput() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const searchResults = useStore((state) => state.searchResults);
  const setSearchResults = useStore((state) => state.setSearchResults);
  if (!user) {
    setUser("github")
  }

  const handleChange = (event, value) => {
    setUser(value);
    debouncedSearch(value);
  };
  console.log(user, "este es el user");
  const debouncedSearch = debounce(async (username) => {
    if (username) {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${username}`
        );
        if (response.status != 200) {
          console.log("error");
        }
        setSearchResults(response.data.items);
      } catch (error) {
        console.error("Error fetching users from GitHub API", error);
      }
    } else {
      setSearchResults([]);
    }
  }, 100);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (user !== "") {
      findUser(user);
      traerRepos(user);
    } else if (user === undefined || user === "" || !user) {
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
        <Autocomplete
          freeSolo
          options={searchResults}
          getOptionLabel={(option) => option.login || ""}
          onInputChange={handleChange}
          renderOption={(props, option) => (
            <li
              key={option.id}
              {...props}
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <img
                src={option.avatar_url}
                alt={option.login}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              {option.login}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Username"
              size="small"
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
                ...params.InputProps,
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
          )}
        />
      </form>
    </section>
  );
}
