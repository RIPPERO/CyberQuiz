import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../../AppStore/store';
import { useHistory } from "react-router-dom";
import Header from '../../Header/Header';
import "./ChartID.scss";

//Chart
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme } from 'victory';

function Chart(props) {
    const history = useHistory();
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Your daily avarange chart!",
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
                    data[i].day_date = data[i].day_date.replace('Z', ' ').replace('T', ' ').slice(0, data[i].day_date.length - 14);
                }
                setChartData(data);
            });
    }, [props]);

    function goToChart() {
        history.push('/chart');
    }

    return (
        <div className="chartID-container">
            <Header />
            <div className="chartIDDiv">
                {chartData.length > 0 &&
                    <div className="margin">
                        <VictoryChart
                            height={800}
                            width={1400}
                            domainPadding={20}>
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(y) => (`${Math.round(y * 100 + Number.EPSILON) / 100}`)}
                                style={{
                                    axis: {
                                        stroke: 'white'  //CHANGE COLOR OF Y-AXIS
                                    },
                                    tickLabels: {
                                        fill: 'white' //CHANGE COLOR OF Y-AXIS LABELS
                                    },
                                    grid: {
                                        stroke: 'white', //CHANGE COLOR OF Y-AXIS GRID LINES
                                        strokeDasharray: '10',
                                    }
                                }}
                            />

                            <VictoryAxis
                                style={{
                                    axis: {
                                        stroke: 'white'  //CHANGE COLOR OF X-AXIS
                                    },
                                    tickLabels: {
                                        fill: 'white' //CHANGE COLOR OF X-AXIS LABELS
                                    },
                                    grid: {
                                        stroke: 'white', //CHANGE COLOR OF X-AXIS GRID LINES
                                        strokeDasharray: '10',
                                    }
                                }}
                            />

                            <VictoryLine
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "#407294", strokeLinecap: "round", strokeWidth: 6 },
                                    parent: { border: "none" },
                                }}
                                interpolation="monotoneX"
                                data={chartData}
                                x="day_date"
                                y="avg_score"
                            />
                        </VictoryChart>
                    </div>
                }

                {chartData.length === 0 &&
                    <div>
                        <p className="font--medium">No chart data avaliable...</p>
                    </div>
                }
            </div>

            <div className="button-redirect">
                <button className="button--main" onClick={() => goToChart()}>Go back</button>
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
