import { useState, useEffect } from "react";
import styled from "styled-components";
import { TbUser, TbChartBar, TbClipboard } from "react-icons/tb";
import Widget from "./summary-components/widget";
import axios from "axios";
import { setHeaders, url } from "../../features/api";
import Chart from './summary-components/chart';
import Transactions from "./summary-components/Transactions";
import AlltimeData from "./summary-components/AlltimeData";

const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

  console.log(income)
  console.log(incomePerc)

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());

        res.data.sort(compare);
        setUsers(res.data);
        setUsersPerc(
          (res.data[0].total / res.data[1].total - 1) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

 
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());

        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);


  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());

        res.data.sort(compare);
        setIncome(res.data);
        setIncomePerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <TbUser/>,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color:"rgb(255, 78, 43)",
      bgColor:"rgba(83, 14, 0, 0.12)",
      percentage: usersPerc 
    },
    {
      icon: <TbClipboard/>,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Order",
      color:"rgb(124, 255, 43)",
      bgColor:"rgba(0, 51, 10, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <TbChartBar/>,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      isMoney: true,
      title: "Earnings",
      color:"rgb(255, 191, 28)",
      bgColor:"rgba(63, 61, 0, 0.12)",
      percentage: incomePerc,
    },
    

  ]

  return (
<StyledSummary>
  <MainStats>
    <Overview>
      <Title>
        <h2>Overview</h2>
      </Title>
      <WidgetWrapper>
    {data?.map((data, index) => <Widget key={index} data={data} /> )}
      </WidgetWrapper>
    </Overview>
    <Chart/>
  </MainStats>
  <SideStats>
    <Transactions/>
    <AlltimeData />
  </SideStats>
</StyledSummary>  )
}

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`

const Title = styled.div`
  p{
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(45, 51, 78);
  color: whitesmoke;
  padding: 1.5rem;
  height: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`