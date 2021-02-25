import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../../AppStore/store';
import Header from '../../Header/Header';
import "./ChartID.scss";

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
                   hi
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
