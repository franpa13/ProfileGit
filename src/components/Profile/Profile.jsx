import React, { useEffect, useState } from "react";
import useStore from "../../store/use-store";
import "./Profile.css";
import CardRepo from "../Card/CardRepo";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const data = useStore((set) => set.data);
  const repo = useStore((set) => set.repo);
  const user = useStore((set) => set.user);
  const [loading, setLoading] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(true);
  const [animate, setAnimate] = useState(false);
  console.log(repo, "repo ");
  useEffect(() => {
    let timer;
    if (data && repo) {
      timer = setTimeout(() => setLoading(false), 1000);
      setAnimate(true);

      setTimeout(() => setAnimate(false), 1000);
    } else {
      setLoading(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data, repo]);

  if (user === undefined) {
    return null;
  }
  const handleClick = () => {
    setMostrarTodos(!mostrarTodos);
  };
  useEffect(() => {
    if (repo.length === 0 && user !== "github") {
      try {
        const notify = () =>
          toast.error(`${user} doesn't have repositories in his profile.`);

        notify();
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const notify = () => toast("Please enter a user.");

        notify();
      } catch (e) {
        console.log(e);
      }
    }
  }, [repo]);

  return (
    <div className="bg-gray-800 md:w-full">
      <header
        className={`w-full flex flex-col justify-center items-center ${
          animate ? "animate-fade-in-down" : ""
        }`}
      >
        <div className="flex w-2/3 justify-center items-center absolute mt-16 flex-col md:left-16 md:justify-center md:items-start">
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="circular"
              width={100}
              height={100}
            />
          ) : (
            <img
              className="w-2/5 bg-gray-800 p-1 rounded-xl md:w-1/5 md:p-3 transform transition-transform duration-500 ease-in-out hover:scale-105"
              src={data.avatar_url}
              alt={data.login}
            />
          )}
          <div className="text-start hidden md:flex flex-col md:gap-3 items-start md:w-1/4 ">
            {loading ? (
              <>
                <Skeleton
                  sx={{ bgcolor: "#424141" }}
                  variant="text"
                  width={100}
                  height={30}
                />
                <Skeleton
                  sx={{ bgcolor: "#424141" }}
                  variant="text"
                  width={200}
                  height={30}
                />
              </>
            ) : (
              <>
                <span className="text-white text-base font-medium">
                  {data.login}
                </span>
                <span className="text-gray-400 text-base font-medium">
                  {data.bio}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:w-full md:flex mt-2 justify-center gap-16 pl-36 items-start">
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="rectangular"
              width={200}
              height={80}
            />
          ) : (
            <div className="bg-black w-1/5 p-4 flex justify-center gap-5 rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
              <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
                Followers
              </span>
              <h2 className="text-white font-semibold">{data.followers}</h2>
            </div>
          )}
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="rectangular"
              width={200}
              height={80}
            />
          ) : (
            <div className="bg-black w-1/5 p-4 flex justify-center gap-5 rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
              <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
                Following
              </span>
              <h2 className="text-white font-semibold">{data.following}</h2>
            </div>
          )}
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="rectangular"
              width={300}
              height={80}
            />
          ) : (
            <div className="bg-black w-1/3 p-4 flex justify-center gap-5 rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
              <LocationOnIcon sx={{ color: "white" }} />
              <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
                Location
              </span>
              <h2 className="text-white font-semibold">{data.location}</h2>
            </div>
          )}
        </div>
      </header>

      <section
        className={`mt-24 flex w-full flex-col gap-8 items-center justify-center md:hidden ${
          animate ? "animate-fade-in-down" : ""
        }`}
      >
        <div className="text-center">
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="text"
              width={150}
              height={30}
            />
          ) : (
            <span className="text-white text-base font-medium">
              {data.login}
            </span>
          )}
          {loading ? (
            <Skeleton
              sx={{ bgcolor: "#424141" }}
              variant="text"
              width={200}
              height={30}
            />
          ) : (
            <p className="text-gray-400 text-base font-medium p-3 text-center">
              {data.bio}
            </p>
          )}
        </div>
        {loading ? (
          <Skeleton
            sx={{ bgcolor: "#424141" }}
            variant="rectangular"
            width={300}
            height={80}
          />
        ) : (
          <div className="bg-black w-3/4 p-3 flex justify-center gap-5 rounded-lg">
            <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
              Followers
            </span>
            <h2 className="text-white font-semibold">{data.followers}</h2>
          </div>
        )}
        {loading ? (
          <Skeleton
            sx={{ bgcolor: "#424141" }}
            variant="rectangular"
            width={300}
            height={80}
          />
        ) : (
          <div className="bg-black w-3/4 p-3 flex justify-center gap-5 rounded-lg">
            <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
              Following
            </span>
            <h2 className="text-white font-semibold">{data.following}</h2>
          </div>
        )}
        {loading ? (
          <Skeleton
            sx={{ bgcolor: "#424141" }}
            variant="rectangular"
            width={300}
            height={80}
          />
        ) : (
          <div className="bg-black w-3/4 p-3 flex justify-center gap-5 rounded-lg">
            <LocationOnIcon sx={{ color: "white" }} />
            <span className="text-gray-500 font-semibold pr-4 border-r border-r-gray-500">
              Location
            </span>
            <h2 className="text-white font-semibold">{data.location}</h2>
          </div>
        )}
      </section>

      <section
        className={`mt-6 flex flex-col justify-center items-center md:mt-44 ${
          animate ? "animate-fade-in-down" : ""
        }`}
      >
        {repo && repo.length > 0 ? (
          <>
            <h2 className="text-white font-semibold mb-4 md:text-xl md:mb-7">
              Recent Repositories
            </h2>
            <div className="p-3 flex flex-col gap-3 justify-center items-center md:flex-row md:justify-center md:p-0 md:gap-8 md:flex-wrap ">
              {loading
                ? Array.from(new Array(4)).map((_, index) => (
                    <div className="w-1/3" key={index}>
                      <Skeleton
                        sx={{ bgcolor: "#424141" }}
                        variant="rectangular"
                        width={220}
                        height={150}
                      />
                    </div>
                  ))
                : mostrarTodos
                ? repo &&
                  repo.slice(0, 4).map((r, i) => {
                    return <CardRepo key={i} repo={r} />;
                  })
                : repo &&
                  repo.map((r, i) => {
                    return <CardRepo key={i} repo={r} />;
                  })}
            </div>
            {loading ? null : mostrarTodos ? (
              <button onClick={handleClick} className="mb-3">
                <span className="text-gray-400 text-lg md:text-xl">
                  View all repositories
                </span>
              </button>
            ) : (
              <button onClick={handleClick} className="mb-3">
                <span className="text-gray-400 text-lg md:text-xl">
                  View recent Repositories
                </span>
              </button>
            )}
          </>
        ) : (
          <div className=" porbando-heig bg-red-500">
            <ToastContainer
              position="bottom-center"
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        )}
      </section>
    </div>
  );
}
