import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = (props) => {
  const [state, setstate] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "Last 60 Days trend",
          lineTension: 0.1,
          backgroundColor: "rgba(170, 223, 223, 0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    },
  });

  useEffect(async () => {
    if (props.passcurrencycodetochart) {
     
      var days = 60;
      var date = new Date();
      var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
      var fromday = last.getDate();
      var frommonth = last.getMonth() + 1;
      var fromyear = last.getFullYear();
      var fromdate = `${fromyear}-${
        frommonth < 10 ? `0${frommonth}` : frommonth
      }-${fromday < 10 ? `0${fromday}` : fromday}`;
      var today = date.getDate();
      var tomonth = date.getMonth() + 1;
      var toyear = date.getFullYear();
      var todate = `${toyear}-${tomonth < 10 ? `0${tomonth}` : tomonth}-${
        today < 10 ? `0${today}` : today
      }`;

      let xaxisdata = [];
      let yaxisdata = [];

      await axios
        .get(
          `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${props.passcurrencycodetochart}&start=${fromdate}&end=${todate}`
        )
        .then((resp) => {
          Object.entries(resp.data.bpi).forEach(([key, value]) => {
            xaxisdata.push(`${moment(key).format("DD")} ${moment(key).format("MMM")}`);
            yaxisdata.push(value);
          });
        });

      const val = [{ ...state.data.datasets[0], data: yaxisdata }];
      setstate((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          labels: xaxisdata,
          datasets: val,
        },
      }));
    }
  }, [props.passcurrencycodetochart]);

  return (
    <div>
      <Line data={state.data} />
    </div>
  );
};

export default Chart;
