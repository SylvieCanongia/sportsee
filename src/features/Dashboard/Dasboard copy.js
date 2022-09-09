import { Component } from "react";
import PropTypes from "prop-types";
import { getUserMainData } from "./../../service/user-http.service";
// import UserMainData from '../../service/api/UserMainData';
import Welcome from "../../components/DashboardComponents/Welcome/Welcome";
// Graphs
import ActivityGraph from "../../components/DashboardComponents/Graph/ActivityGraph/ActivityGraph";
import AverageSessionGraph from "../../components/DashboardComponents/Graph/AverageSessionGraph/AverageSessionGraph";
import PerformanceGraph from "../../components/DashboardComponents/Graph/PerformanceGraph/PerformanceGrapĥ";
import Score from "../../components/DashboardComponents/Graph/Score/Score";

// Energy consumed detail
import Calories from "../../components/DashboardComponents/EnergyConsumed/Calories/Calories";
import Proteins from "../../components/DashboardComponents/EnergyConsumed/Proteins/Proteins";
import Sugars from "../../components/DashboardComponents/EnergyConsumed/Sugars/Sugars";
import Lipids from "../../components/DashboardComponents/EnergyConsumed/Lipids/Lipids";

import "./Dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMainData: {},
      id: this.props.id,
    };
  }

  componentDidMount() {
    const { id } = this.state

    getUserMainData(id)
      // .then((jsResponse) => console.log(jsResponse.data))
      .then((response) => {
        this.setState({userMainData: response.data })
    })
  }

  render() {
    
    const { userMainData } = this.state
   
    // console.log(userMainData)
    // console.log(userMainData.id)
    const {
      id,
      userInfos,
      todayScore,
      keyData,
    } = userMainData

    // console.log(id)
    console.log(userInfos)
    // console.log(todayScore)
    console.log(keyData)

    return (
      <div>
        <p>Id : {id}</p>
        <p>Coucou
        {/* {Object.keys({userInfos}).map((userInfo, index) => {
          return (
            <span key={index}>userInfo : {userInfo}</span>
          )
        })} */}
        </p>
        <p>todayScore : {todayScore}</p>
        {/* <p>keyData : {keyData}</p> */}

        <section className="dashboard">
          <Welcome />
          <article className="dashboard__graphsAndEnergy__container">
            <article className="dashboard__graphs">
              <ActivityGraph />
              <div className="dashboard__graphs__row2">
                <AverageSessionGraph />
                <PerformanceGraph />
                <Score />
              </div>
            </article>
            <article className="dashboard__energyConsumed">
              <Calories />
              <Proteins />
              <Sugars />
              <Lipids />
            </article>
          </article>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;




{/* {[...Array(3)].map((userInfos, index) =>
          <div key={index}>
          { userInfos }
          </div>
        )
        } */}

// const Dashboard = (props) => {
//   const id = props.id;

//   return (
//     <div>
// <p>Id : { id }</p>
// <section className='dashboard'>
//   <Welcome />
//   <article className='dashboard__graphsAndEnergy__container'>
//     <article className='dashboard__graphs'>
//       <ActivityGraph />
//       <div className='dashboard__graphs__row2'>
//         <AverageSessionGraph />
//         <PerformanceGraph />
//         <Score />
//       </div>
//     </article>
//     <article className='dashboard__energyConsumed'>
//       <Calories />
//       <Proteins />
//       <Sugars />
//       <Lipids />
//     </article>
//   </article>
// </section>
//     </div>
//   );

// }

// export default Dashboard;