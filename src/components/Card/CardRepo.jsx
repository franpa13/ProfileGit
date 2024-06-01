import React, { useEffect, useState } from "react";
import useStore from "../../store/use-store";
import { findLanguages } from "../../service/findLanguages";

export default function CardRepo({ repo }) {
  const [daysSinceUpdate, setDaysSinceUpdate] = useState(0);

  useEffect(() => {
    if (repo && repo.updated_at) {
      const updatedAtDate = new Date(repo.updated_at);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate - updatedAtDate;
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const differenceInDays = Math.floor(
        differenceInMilliseconds / millisecondsPerDay
      );
      setDaysSinceUpdate(differenceInDays);
    }
  }, [repo]);

  return (
    <a
      target="_blank"
      href={repo.html_url}
      className="w-full m-1 flex flex-col gap-2 bg-gradient-to-r from-gray-900 md:m-0 to-blue-950 p-4 rounded-lg md:p-4 md:w-1/3 md:mb-3 transform transition-transform duration-500 ease-in-out hover:scale-105"
    >
      <h3 className="text-white text-xl md:text-2xl">{repo && repo.name}</h3>
      <h2 className="text-gray-400 text-xs md:text-xl">{repo && repo.description}</h2>
      <div className="mt-2 flex justify-between flex-wrap items-center md:justify-start md:gap-3">
        {repo && repo.license && (
          <div className="flex gap-4 items-center">
            <img src="./Chield_alt.svg" alt="" />
            <span className="text-gray-400 text-xs">MIT</span>
          </div>
        )}
        <img src="./Nesting.svg" alt="" />
        <span className="text-gray-400 text-xs">{repo && repo.forks}</span>

        <img src="./Star.svg" alt="" />
        <span className="text-gray-400 text-xs">
          {repo && repo.stargazers_count}
        </span>
        <span className="text-gray-400 text-xs">
          Updated at {daysSinceUpdate} days ago
        </span>
      </div>
    </a>
  );
}
