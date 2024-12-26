import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const SimpleLineChart = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 30, right: 5, left: -50, bottom: 10 }}>
                <XAxis dataKey="name" stroke="none"/>
                <YAxis stroke="none" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke="#007bff"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

SimpleLineChart.propTypes = {
    data: PropTypes.array.isRequired,
    dataKey: PropTypes.string.isRequired,
};

export default SimpleLineChart;
