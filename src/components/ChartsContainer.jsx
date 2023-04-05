import { useState } from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area chart' : 'Bar chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
