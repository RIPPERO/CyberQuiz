import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../../AppStore/store';
import Header from '../../Header/Header';
import "./ChartID.scss";

import { ResponsiveLine } from '@nivo/line'

function Chart(props) {
    const [chartData, setChartData] = useState<any[]>([])

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Chart!",
            },
        })

        const API = `${props.apiUrl}quiz-user/chart`;
        const chartJson = { quiz_ID_ID: props.quiz_ID, user_ID_ID: props.user_ID }

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chartJson }),
        })
            .then((response) => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].date = data[i].date.replace('Z', ' ').replace('T', ' ').slice(0, data[i].date.length - 5);
                }
                setChartData(data);
            });
    }, []);

    return (
        <div className="chartID-container">
            <Header />
            <div className="chartIDDiv">
                <p className="font--medium margin"></p>


                <div style={{ backgroundColor: "white" }}>
                    <ResponsiveLine
                        data={chartData}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'transportation',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>


            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.user.usernameSet,
        user_ID: state.user.user_ID,
        quiz_ID: state.quiz.quiz_ID,
    }
}

export default connect(mapStateToProps)(Chart);
