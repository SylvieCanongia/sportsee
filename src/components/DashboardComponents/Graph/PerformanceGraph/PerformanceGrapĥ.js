import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { USER_PERFORMANCE } from '../../../../mocks/mock-data';
import { getUserPerformance } from '../../../../service/user-http.service';
import { UserPerformanceModel } from '../../../../service/models/UserPerformanceModel';
import './performanceGraph.scss';

/**
 * Component - Graph displaying the performance data of a user
 * @module PerformanceGraph
 * @param { Object } object
 * @param { Integer } object.id - The id of the user
 * @param { Boolean } object.mock - True if is mocked data and false if is API data
 * @returns { HTMLElement } - 
 */
const PerformanceGrapĥ = ({ id, mock }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    // ----- MOCK DATA -----
    if(mock === true) {
      const userPerformanceData = USER_PERFORMANCE.find((userData) => userData.userId === id);
      const userData = new UserPerformanceModel(userPerformanceData);
      // the property data is an array so we can use it as is into Recharts graph
      setData(userData.data);
    }
  
    // ----- API DATA -----
    if(mock === false) {
    getUserPerformance(id)
      .then((response) => {
        const userData = new UserPerformanceModel(response.data);
        setData(userData.data);
      });
    }
  }, [id, mock]);

  return (
    <div className='performanceGraph'>
      { data && <ResponsiveContainer width="100%" height="100%">
       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}
        margin={{
            top: 30,
            right: 5,
            left: 5,
            bottom: 15,
          }}
      >
          <PolarGrid stroke='white' radialLines={false} />
          <PolarAngleAxis dataKey="kind" fontSize="12px" stroke='white' tickLine={false} />
          <Radar name="Perf" dataKey="value" fill="hsl(0, 100%, 50%)" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer> }
    </div>
  );
};

PerformanceGrapĥ.propTypes = {
  id: PropTypes.number.isRequired,
  mock: PropTypes.bool.isRequired,
}

export default PerformanceGrapĥ;