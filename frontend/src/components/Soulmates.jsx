import React from "react";
import { useNavigate } from "react-router-dom";

const Soulmates = () => {
  const navigate = useNavigate();

  const matches = [
    { name: "Archit", percentage: 80 },
    { name: "Garvit", percentage: 65 },
    { name: "Sheetal", percentage: 45 },
  ];

  return (
    <div className="flex flex-col w-[40%] items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg ml-4 text-white">
      <h3 className="text-xl font-semibold mb-4">Soulmates</h3>
      <ul className="w-full space-y-3">
        {matches.map((match, index) => (
          <li
            key={index}
            className="w-full cursor-pointer hover:bg-gray-700 p-1 rounded-lg"
            onClick={() => navigate(`/profile/${match.name.toLowerCase()}`)}
          >
            <div className="flex justify-between mb-1 ">
              <span className="font-medium hover:text-blue-400 transition duration-300">
                {match.name}
              </span>
              <span className="text-sm">{match.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${match.percentage}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Soulmates;
