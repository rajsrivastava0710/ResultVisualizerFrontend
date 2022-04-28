import useHttp from "../custom_hooks/useHttp";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import ScatterChart from "../components/charts/ScatterChart";
import HistogramChart from "../components/charts/HistogramChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PieChart from "../components/charts/PieChart";
import BubbleChart from "../components/charts/BubbleChart";

const ChartsVisualization = () => {
  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  const {
    isLoading: isLoading1,
    error: error1,
    sendRequest: sendRequest1,
  } = useHttp();
  const {
    isLoading: isLoading2,
    error: error2,
    sendRequest: sendRequest2,
  } = useHttp();
  const {
    isLoading: isLoading3,
    error: error3,
    sendRequest: sendRequest3,
  } = useHttp();
  const [branch, setBranch] = useState("Civil");
  const [table1Data, setTable1Data] = useState();
  const [table2Data, setTable2Data] = useState();
  const [table3Data, setTable3Data] = useState();

  useEffect(() => {
    sendRequest1(
      {
        url: `${BASE_URL}/student?branch=${branch}`,
      },
      setTable1Data
    );
    sendRequest2(
      {
        url: `${BASE_URL}/visualise/rollPercent?branch=${branch}`,
      },
      setTable2Data
    );
  }, [branch]);

  useEffect(() => {
    sendRequest3(
      {
        url: `${BASE_URL}/visualise/branchBubble`,
      },
      setTable3Data
    );
  }, []);
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Branch</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={branch}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="Civil">Civil</MenuItem>
          <MenuItem value="Computer Science">Computer Science</MenuItem>
          <MenuItem value="Electrical">Electrical</MenuItem>
        </Select>
      </FormControl>
      {table1Data && <ScatterChart tableData={table1Data} />}
      {table1Data && <HistogramChart tableData={table1Data} />}
      {table2Data && <PieChart tableData={table2Data} />}
      {table3Data && <BubbleChart tableData={table3Data} />}
    </div>
  );
};

export default ChartsVisualization;
