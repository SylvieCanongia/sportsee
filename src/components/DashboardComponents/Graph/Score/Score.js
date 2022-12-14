import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from "recharts";
import { getUserMainData } from "../../../../service/user-http.service";
import "./score.scss";

/**
 * Graph displaying the score data of a user
 * @module Score
 * @param { Object } object
 * @param { Integer } object.id - The id of the user
 * @param { Boolean } object.mock - True if is mocked data and false if is API data
 * @returns { HTMLElement } -
 */
const Score = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserMainData(id).then((response) => {
      setData([response]);
    });
  }, [id]);

  let scoreInPercentage;
  let scoreInDegrees;

  // Condition if data[0] exists to avoid error : Cannot read
  // properties of null (reading '0')
  if (data) {
    scoreInPercentage = data[0].todayScore * 100;
    scoreInDegrees = data[0].todayScore * 360;
  }

  return (
    <div className="score">
      <h3 className="scoreLabel">Score</h3>
      {data && (
        <React.Fragment>
          <p className="scoreBarLabel">
            <span> {scoreInPercentage} %</span>de votre objectif
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="85%"
              outerRadius="100%"
              data={data}
              startAngle={-180}
              endAngle={-180 - scoreInDegrees}
              barSize={10}
              margin={{
                top: 30,
                right: 5,
                left: 5,
                bottom: 15,
              }}
            >
              <RadialBar cornerRadius={50} label={false} clockWise={true} dataKey="todayScore" name="Score du jour" fill="hsl(0, 100%, 50%)" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </React.Fragment>
      )}
    </div>
  );
};

Score.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Score;
