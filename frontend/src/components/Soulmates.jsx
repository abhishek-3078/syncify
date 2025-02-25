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
          <li key={index} className="w-full flex items-center justify-between">
            <div className="flex flex-col w-full">
              <span className="font-medium">{match.name}</span>
              <div className="relative w-full bg-gray-700 rounded-md h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-md"
                  style={{ width: `${match.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">{match.percentage}% Match</span>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 ml-4 rounded-md hover:bg-blue-600 transition cursor-pointer duration-300"
              onClick={() => navigate(`/user/31d5hbigmyqh3hmbxly672dqhe2m`)}
            >
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Soulmates;
