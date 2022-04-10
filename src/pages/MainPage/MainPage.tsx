import React, {FC, useEffect, useState} from 'react';
import classes from "./MainPage.module.scss"
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import Profile from "../../components/Profile/Profile";
import User from "../../components/User/User";
import {userSlice} from "../../redux/reducers/UserReducer/UserSlice";


const MainPage: FC = () => {
    //for test you can use: arthurshag, gaearon, TalisMan701
    /*const [dataContribution, setDataContribution] = useState<any>()*/
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.userReducer.users)

    /*async function getContributions(token="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", username = "TalisMan701") {
        const headers = {
            'Authorization': `bearer ${token}`,
        }
        const body = {
            "query": `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`
        }
        const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
        return await response.json()
    }*/

    useEffect(() => {
        /*getContributions()
            .then(data => {
                setDataContribution(data.data.user.contributionsCollection.contributionCalendar)
                console.log(data.data.user.contributionsCollection.contributionCalendar)
            })*/
    }, []);

    /*const contributionCalendar = () => {
        return(
            <div>
                {dataContribution &&
                    <>
                        <div>{dataContribution.totalContributions}</div>
                        <div>
                            <span>colors</span>
                            <div>
                                {dataContribution.colors.map((color: string) => {
                                    return(
                                        <div style={{background: color, width: 16, height: 16}}/>
                                    )
                                })}
                            </div>
                            <svg width="823" height="128" className="js-calendar-graph-svg">
                                <g transform="translate(15, 20)">
                                    <g transform="translate(0, 0)">
                                        <rect width="11" height="11" x="16" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="16" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-12" data-level="0"></rect>
                                        <rect width="11" height="11" x="16" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-04-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="16" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-04-14" data-level="1"></rect>
                                        <rect width="11" height="11" x="16" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-04-15" data-level="2"></rect>
                                        <rect width="11" height="11" x="16" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="16" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-17" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(16, 0)">
                                        <rect width="11" height="11" x="15" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="15" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-04-19" data-level="2"></rect>
                                        <rect width="11" height="11" x="15" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="9" data-date="2021-04-20" data-level="4"></rect>
                                        <rect width="11" height="11" x="15" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="15" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-22" data-level="0"></rect>
                                        <rect width="11" height="11" x="15" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="15" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-04-24" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(32, 0)">
                                        <rect width="11" height="11" x="14" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="14" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="14" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="14" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-04-28" data-level="2"></rect>
                                        <rect width="11" height="11" x="14" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-04-29" data-level="0"></rect>
                                        <rect width="11" height="11" x="14" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-04-30" data-level="1"></rect>
                                        <rect width="11" height="11" x="14" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-01" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(48, 0)">
                                        <rect width="11" height="11" x="13" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="13" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-05-03" data-level="1"></rect>
                                        <rect width="11" height="11" x="13" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-05-04" data-level="1"></rect>
                                        <rect width="11" height="11" x="13" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-05-05" data-level="2"></rect>
                                        <rect width="11" height="11" x="13" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-05-06" data-level="2"></rect>
                                        <rect width="11" height="11" x="13" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-07" data-level="0"></rect>
                                        <rect width="11" height="11" x="13" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-08" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(64, 0)">
                                        <rect width="11" height="11" x="12" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="12" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-10" data-level="0"></rect>
                                        <rect width="11" height="11" x="12" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="12" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-12" data-level="0"></rect>
                                        <rect width="11" height="11" x="12" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-05-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="12" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="12" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-15" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(80, 0)">
                                        <rect width="11" height="11" x="11" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="11" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="11" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="11" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-05-19" data-level="2"></rect>
                                        <rect width="11" height="11" x="11" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="11" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="11" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-05-22" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(96, 0)">
                                        <rect width="11" height="11" x="10" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="10" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="10" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-05-25" data-level="1"></rect>
                                        <rect width="11" height="11" x="10" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="10" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="10" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-05-28" data-level="2"></rect>
                                        <rect width="11" height="11" x="10" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-05-29" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(112, 0)">
                                        <rect width="11" height="11" x="9" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-05-30" data-level="2"></rect>
                                        <rect width="11" height="11" x="9" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-05-31" data-level="1"></rect>
                                        <rect width="11" height="11" x="9" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="9" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-06-02" data-level="2"></rect>
                                        <rect width="11" height="11" x="9" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-06-03" data-level="1"></rect>
                                        <rect width="11" height="11" x="9" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="7" data-date="2021-06-04" data-level="3"></rect>
                                        <rect width="11" height="11" x="9" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-05" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(128, 0)">
                                        <rect width="11" height="11" x="8" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-07" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-10" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="8" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-12" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(144, 0)">
                                        <rect width="11" height="11" x="7" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-13" data-level="0"></rect>
                                        <rect width="11" height="11" x="7" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="7" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="7" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-06-16" data-level="2"></rect>
                                        <rect width="11" height="11" x="7" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-06-17" data-level="2"></rect>
                                        <rect width="11" height="11" x="7" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="7" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-19" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(160, 0)">
                                        <rect width="11" height="11" x="6" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="6" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="6" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-22" data-level="0"></rect>
                                        <rect width="11" height="11" x="6" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-06-23" data-level="3"></rect>
                                        <rect width="11" height="11" x="6" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="6" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-06-25" data-level="2"></rect>
                                        <rect width="11" height="11" x="6" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-26" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(176, 0)">
                                        <rect width="11" height="11" x="5" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-06-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="5" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-06-28" data-level="3"></rect>
                                        <rect width="11" height="11" x="5" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-06-29" data-level="2"></rect>
                                        <rect width="11" height="11" x="5" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="9" data-date="2021-06-30" data-level="4"></rect>
                                        <rect width="11" height="11" x="5" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="5" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="5" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-03" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(192, 0)">
                                        <rect width="11" height="11" x="4" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="4" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-05" data-level="0"></rect>
                                        <rect width="11" height="11" x="4" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="4" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-07-07" data-level="1"></rect>
                                        <rect width="11" height="11" x="4" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="4" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-07-09" data-level="1"></rect>
                                        <rect width="11" height="11" x="4" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-07-10" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(208, 0)">
                                        <rect width="11" height="11" x="3" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="3" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="7" data-date="2021-07-12" data-level="3"></rect>
                                        <rect width="11" height="11" x="3" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-13" data-level="0"></rect>
                                        <rect width="11" height="11" x="3" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="3" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="3" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="3" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-17" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(224, 0)">
                                        <rect width="11" height="11" x="2" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="2" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-07-19" data-level="3"></rect>
                                        <rect width="11" height="11" x="2" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="2" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="2" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-22" data-level="0"></rect>
                                        <rect width="11" height="11" x="2" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-07-23" data-level="2"></rect>
                                        <rect width="11" height="11" x="2" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-07-24" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(240, 0)">
                                        <rect width="11" height="11" x="1" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="1" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="1" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="1" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="1" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-29" data-level="0"></rect>
                                        <rect width="11" height="11" x="1" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-07-30" data-level="3"></rect>
                                        <rect width="11" height="11" x="1" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-07-31" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(256, 0)">
                                        <rect width="11" height="11" x="0" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="0" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="0" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="0" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="0" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-08-05" data-level="1"></rect>
                                        <rect width="11" height="11" x="0" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="0" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-07" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(272, 0)">
                                        <rect width="11" height="11" x="-1" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-1" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="-1" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-08-10" data-level="1"></rect>
                                        <rect width="11" height="11" x="-1" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="-1" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-12" data-level="0"></rect>
                                        <rect width="11" height="11" x="-1" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-08-13" data-level="2"></rect>
                                        <rect width="11" height="11" x="-1" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-14" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(288, 0)">
                                        <rect width="11" height="11" x="-2" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="-2" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-08-16" data-level="1"></rect>
                                        <rect width="11" height="11" x="-2" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-2" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="9" data-date="2021-08-18" data-level="4"></rect>
                                        <rect width="11" height="11" x="-2" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-19" data-level="0"></rect>
                                        <rect width="11" height="11" x="-2" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="-2" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-21" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(304, 0)">
                                        <rect width="11" height="11" x="-3" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-08-22" data-level="2"></rect>
                                        <rect width="11" height="11" x="-3" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="-3" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-3" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="-3" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="-3" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-3" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-28" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(320, 0)">
                                        <rect width="11" height="11" x="-4" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-29" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-30" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-08-31" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="-4" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-04" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(336, 0)">
                                        <rect width="11" height="11" x="-5" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-05" data-level="0"></rect>
                                        <rect width="11" height="11" x="-5" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="-5" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-07" data-level="0"></rect>
                                        <rect width="11" height="11" x="-5" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-09-08" data-level="2"></rect>
                                        <rect width="11" height="11" x="-5" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="-5" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-09-10" data-level="2"></rect>
                                        <rect width="11" height="11" x="-5" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-11" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(352, 0)">
                                        <rect width="11" height="11" x="-6" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-09-12" data-level="1"></rect>
                                        <rect width="11" height="11" x="-6" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-09-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="-6" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="-6" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-09-15" data-level="2"></rect>
                                        <rect width="11" height="11" x="-6" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="13" data-date="2021-09-16"
                                              data-level="4"></rect>
                                        <rect width="11" height="11" x="-6" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-6" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-18" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(368, 0)">
                                        <rect width="11" height="11" x="-7" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-19" data-level="0"></rect>
                                        <rect width="11" height="11" x="-7" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-09-20" data-level="3"></rect>
                                        <rect width="11" height="11" x="-7" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="-7" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-09-22" data-level="1"></rect>
                                        <rect width="11" height="11" x="-7" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="-7" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-7" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-09-25" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(384, 0)">
                                        <rect width="11" height="11" x="-8" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="-8" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-8" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="-8" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2021-09-29" data-level="3"></rect>
                                        <rect width="11" height="11" x="-8" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-09-30" data-level="0"></rect>
                                        <rect width="11" height="11" x="-8" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-10-01" data-level="1"></rect>
                                        <rect width="11" height="11" x="-8" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-02" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(400, 0)">
                                        <rect width="11" height="11" x="-9" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="-9" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-10-04" data-level="2"></rect>
                                        <rect width="11" height="11" x="-9" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-10-05" data-level="2"></rect>
                                        <rect width="11" height="11" x="-9" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="-9" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-10-07" data-level="1"></rect>
                                        <rect width="11" height="11" x="-9" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-9" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-10-09" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(416, 0)">
                                        <rect width="11" height="11" x="-10" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-10-10" data-level="2"></rect>
                                        <rect width="11" height="11" x="-10" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="-10" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-10-12" data-level="1"></rect>
                                        <rect width="11" height="11" x="-10" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-10-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="-10" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="-10" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="-10" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-16" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(432, 0)">
                                        <rect width="11" height="11" x="-11" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-11" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-10-18" data-level="1"></rect>
                                        <rect width="11" height="11" x="-11" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-19" data-level="0"></rect>
                                        <rect width="11" height="11" x="-11" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="-11" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-10-21" data-level="1"></rect>
                                        <rect width="11" height="11" x="-11" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-22" data-level="0"></rect>
                                        <rect width="11" height="11" x="-11" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-23" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(448, 0)">
                                        <rect width="11" height="11" x="-12" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-29" data-level="0"></rect>
                                        <rect width="11" height="11" x="-12" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-30" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(464, 0)">
                                        <rect width="11" height="11" x="-13" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-10-31" data-level="0"></rect>
                                        <rect width="11" height="11" x="-13" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="-13" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="-13" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="-13" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="-13" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="7" data-date="2021-11-05" data-level="3"></rect>
                                        <rect width="11" height="11" x="-13" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-11-06" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(480, 0)">
                                        <rect width="11" height="11" x="-14" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-07" data-level="1"></rect>
                                        <rect width="11" height="11" x="-14" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-14" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="-14" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-10" data-level="0"></rect>
                                        <rect width="11" height="11" x="-14" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-11" data-level="1"></rect>
                                        <rect width="11" height="11" x="-14" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-11-12" data-level="2"></rect>
                                        <rect width="11" height="11" x="-14" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-11-13" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(496, 0)">
                                        <rect width="11" height="11" x="-15" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-11-14" data-level="2"></rect>
                                        <rect width="11" height="11" x="-15" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-11-15" data-level="1"></rect>
                                        <rect width="11" height="11" x="-15" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-11-16" data-level="2"></rect>
                                        <rect width="11" height="11" x="-15" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-17" data-level="1"></rect>
                                        <rect width="11" height="11" x="-15" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-18" data-level="1"></rect>
                                        <rect width="11" height="11" x="-15" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-19" data-level="1"></rect>
                                        <rect width="11" height="11" x="-15" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="14" data-date="2021-11-20"
                                              data-level="4"></rect>
                                    </g>
                                    <g transform="translate(512, 0)">
                                        <rect width="11" height="11" x="-16" y="0"
                                              className="ContributionCalendar-day active" rx="2" ry="2" data-count="21"
                                              data-date="2021-11-21" data-level="4"></rect>
                                        <rect width="11" height="11" x="-16" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-22" data-level="0"></rect>
                                        <rect width="11" height="11" x="-16" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-11-23" data-level="1"></rect>
                                        <rect width="11" height="11" x="-16" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-11-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-16" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-11-25" data-level="2"></rect>
                                        <rect width="11" height="11" x="-16" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-11-26" data-level="2"></rect>
                                        <rect width="11" height="11" x="-16" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-11-27" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(528, 0)">
                                        <rect width="11" height="11" x="-17" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2021-11-28" data-level="2"></rect>
                                        <rect width="11" height="11" x="-17" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-11-29" data-level="1"></rect>
                                        <rect width="11" height="11" x="-17" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-11-30" data-level="1"></rect>
                                        <rect width="11" height="11" x="-17" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-01" data-level="1"></rect>
                                        <rect width="11" height="11" x="-17" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="-17" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-03" data-level="1"></rect>
                                        <rect width="11" height="11" x="-17" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-12-04" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(544, 0)">
                                        <rect width="11" height="11" x="-18" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="10" data-date="2021-12-05"
                                              data-level="4"></rect>
                                        <rect width="11" height="11" x="-18" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-12-06" data-level="2"></rect>
                                        <rect width="11" height="11" x="-18" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="9" data-date="2021-12-07" data-level="4"></rect>
                                        <rect width="11" height="11" x="-18" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-18" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="-18" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2021-12-10" data-level="1"></rect>
                                        <rect width="11" height="11" x="-18" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="7" data-date="2021-12-11" data-level="3"></rect>
                                    </g>
                                    <g transform="translate(560, 0)">
                                        <rect width="11" height="11" x="-19" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-12" data-level="0"></rect>
                                        <rect width="11" height="11" x="-19" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="-19" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-14" data-level="1"></rect>
                                        <rect width="11" height="11" x="-19" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2021-12-15" data-level="2"></rect>
                                        <rect width="11" height="11" x="-19" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="-19" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-19" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2021-12-18" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(576, 0)">
                                        <rect width="11" height="11" x="-20" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-19" data-level="0"></rect>
                                        <rect width="11" height="11" x="-20" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-20" data-level="1"></rect>
                                        <rect width="11" height="11" x="-20" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="-20" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-22" data-level="1"></rect>
                                        <rect width="11" height="11" x="-20" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-23" data-level="1"></rect>
                                        <rect width="11" height="11" x="-20" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-20" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-25" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(592, 0)">
                                        <rect width="11" height="11" x="-21" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-26" data-level="1"></rect>
                                        <rect width="11" height="11" x="-21" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2021-12-27" data-level="1"></rect>
                                        <rect width="11" height="11" x="-21" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="-21" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-29" data-level="0"></rect>
                                        <rect width="11" height="11" x="-21" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-30" data-level="0"></rect>
                                        <rect width="11" height="11" x="-21" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2021-12-31" data-level="0"></rect>
                                        <rect width="11" height="11" x="-21" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-01" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(608, 0)">
                                        <rect width="11" height="11" x="-22" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-02" data-level="0"></rect>
                                        <rect width="11" height="11" x="-22" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="-22" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="-22" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-01-05" data-level="1"></rect>
                                        <rect width="11" height="11" x="-22" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-01-06" data-level="1"></rect>
                                        <rect width="11" height="11" x="-22" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-01-07" data-level="1"></rect>
                                        <rect width="11" height="11" x="-22" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-08" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(624, 0)">
                                        <rect width="11" height="11" x="-23" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-01-09" data-level="1"></rect>
                                        <rect width="11" height="11" x="-23" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-10" data-level="0"></rect>
                                        <rect width="11" height="11" x="-23" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-01-11" data-level="1"></rect>
                                        <rect width="11" height="11" x="-23" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-12" data-level="0"></rect>
                                        <rect width="11" height="11" x="-23" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-01-13" data-level="1"></rect>
                                        <rect width="11" height="11" x="-23" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="-23" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-15" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(640, 0)">
                                        <rect width="11" height="11" x="-24" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2022-01-16" data-level="3"></rect>
                                        <rect width="11" height="11" x="-24" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-24" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="-24" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-19" data-level="0"></rect>
                                        <rect width="11" height="11" x="-24" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="-24" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="-24" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-22" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(656, 0)">
                                        <rect width="11" height="11" x="-25" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="-25" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-01-24" data-level="1"></rect>
                                        <rect width="11" height="11" x="-25" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="-25" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-26" data-level="0"></rect>
                                        <rect width="11" height="11" x="-25" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-25" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="-25" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-29" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(672, 0)">
                                        <rect width="11" height="11" x="-26" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-01-30" data-level="0"></rect>
                                        <rect width="11" height="11" x="-26" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-01-31" data-level="1"></rect>
                                        <rect width="11" height="11" x="-26" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="-26" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2022-02-02" data-level="2"></rect>
                                        <rect width="11" height="11" x="-26" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="6" data-date="2022-02-03" data-level="3"></rect>
                                        <rect width="11" height="11" x="-26" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="-26" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-02-05" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(688, 0)">
                                        <rect width="11" height="11" x="-27" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-02-06" data-level="1"></rect>
                                        <rect width="11" height="11" x="-27" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-02-07" data-level="1"></rect>
                                        <rect width="11" height="11" x="-27" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-02-08" data-level="1"></rect>
                                        <rect width="11" height="11" x="-27" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-02-09" data-level="1"></rect>
                                        <rect width="11" height="11" x="-27" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2022-02-10" data-level="2"></rect>
                                        <rect width="11" height="11" x="-27" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="-27" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-12" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(704, 0)">
                                        <rect width="11" height="11" x="-28" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-13" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="-28" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-02-19" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(720, 0)">
                                        <rect width="11" height="11" x="-29" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="-29" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-02-21" data-level="1"></rect>
                                        <rect width="11" height="11" x="-29" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-02-22" data-level="1"></rect>
                                        <rect width="11" height="11" x="-29" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-23" data-level="0"></rect>
                                        <rect width="11" height="11" x="-29" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-29" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="-29" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-26" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(736, 0)">
                                        <rect width="11" height="11" x="-30" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-30" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-02-28" data-level="0"></rect>
                                        <rect width="11" height="11" x="-30" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-03-01" data-level="1"></rect>
                                        <rect width="11" height="11" x="-30" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2022-03-02" data-level="2"></rect>
                                        <rect width="11" height="11" x="-30" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-03-03" data-level="1"></rect>
                                        <rect width="11" height="11" x="-30" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="-30" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-05" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(752, 0)">
                                        <rect width="11" height="11" x="-31" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2022-03-06" data-level="2"></rect>
                                        <rect width="11" height="11" x="-31" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2022-03-07" data-level="2"></rect>
                                        <rect width="11" height="11" x="-31" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-31" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-09" data-level="0"></rect>
                                        <rect width="11" height="11" x="-31" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-10" data-level="0"></rect>
                                        <rect width="11" height="11" x="-31" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-11" data-level="0"></rect>
                                        <rect width="11" height="11" x="-31" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-03-12" data-level="1"></rect>
                                    </g>
                                    <g transform="translate(768, 0)">
                                        <rect width="11" height="11" x="-32" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-13" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-14" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-15" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-16" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-17" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-18" data-level="0"></rect>
                                        <rect width="11" height="11" x="-32" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-19" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(784, 0)">
                                        <rect width="11" height="11" x="-33" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-20" data-level="0"></rect>
                                        <rect width="11" height="11" x="-33" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-21" data-level="0"></rect>
                                        <rect width="11" height="11" x="-33" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="4" data-date="2022-03-22" data-level="2"></rect>
                                        <rect width="11" height="11" x="-33" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="2" data-date="2022-03-23" data-level="1"></rect>
                                        <rect width="11" height="11" x="-33" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-24" data-level="0"></rect>
                                        <rect width="11" height="11" x="-33" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-25" data-level="0"></rect>
                                        <rect width="11" height="11" x="-33" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="5" data-date="2022-03-26" data-level="2"></rect>
                                    </g>
                                    <g transform="translate(800, 0)">
                                        <rect width="11" height="11" x="-34" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-27" data-level="0"></rect>
                                        <rect width="11" height="11" x="-34" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="3" data-date="2022-03-28" data-level="2"></rect>
                                        <rect width="11" height="11" x="-34" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-03-29" data-level="1"></rect>
                                        <rect width="11" height="11" x="-34" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-03-30" data-level="0"></rect>
                                        <rect width="11" height="11" x="-34" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="1" data-date="2022-03-31" data-level="1"></rect>
                                        <rect width="11" height="11" x="-34" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-01" data-level="0"></rect>
                                        <rect width="11" height="11" x="-34" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-02" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(816, 0)">
                                        <rect width="11" height="11" x="-35" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-03" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="15" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-04" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="30" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-05" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="45" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-06" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="60" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-07" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="75" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-08" data-level="0"></rect>
                                        <rect width="11" height="11" x="-35" y="90" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-09" data-level="0"></rect>
                                    </g>
                                    <g transform="translate(832, 0)">
                                        <rect width="11" height="11" x="-36" y="0" className="ContributionCalendar-day"
                                              rx="2" ry="2" data-count="0" data-date="2022-04-10" data-level="0"></rect>
                                    </g>
                                    <text x="16" y="-8" className={classes.ContributionCalendarLabel}>Apr</text>
                                    <text x="61" y="-8" className={classes.ContributionCalendarLabel}>May</text>
                                    <text x="136" y="-8" className={classes.ContributionCalendarLabel}>Jun</text>
                                    <text x="196" y="-8" className={classes.ContributionCalendarLabel}>Jul</text>
                                    <text x="256" y="-8" className={classes.ContributionCalendarLabel}>Aug</text>
                                    <text x="331" y="-8" className={classes.ContributionCalendarLabel}>Sep</text>
                                    <text x="391" y="-8" className={classes.ContributionCalendarLabel}>Oct</text>
                                    <text x="466" y="-8" className={classes.ContributionCalendarLabel}>Nov</text>
                                    <text x="526" y="-8" className={classes.ContributionCalendarLabel}>Dec</text>
                                    <text x="586" y="-8" className={classes.ContributionCalendarLabel}>Jan</text>
                                    <text x="661" y="-8" className={classes.ContributionCalendarLabel}>Feb</text>
                                    <text x="721" y="-8" className={classes.ContributionCalendarLabel}>Mar</text>
                                    <text x="781" y="-8" className={classes.ContributionCalendarLabel}>Apr</text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15" dy="8"
                                          style={{display: "none"}}>Sun
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15"
                                          dy="25">Mon
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15" dy="32"
                                          style={{display: "none"}}>Tue
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15"
                                          dy="56">Wed
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15" dy="57"
                                          style={{display: "none"}}>Thu
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15"
                                          dy="85">Fri
                                    </text>
                                    <text text-anchor="start" className={classes.ContributionCalendarLabel} dx="-15" dy="81"
                                          style={{display: "none"}}>Sat
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </>
                }
            </div>
        )
    }*/

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <div className={classes.users}>
                    {users.map((user, index) => {
                        return(
                            <User user={user} index={index}/>
                        )
                    })}
                    <div
                        onClick={()=>dispatch(userSlice.actions.addNewUser())}
                        className={classes.addUserBtn}
                    >+</div>
                </div>

                {/*{contributionCalendar()}*/}
            </div>
        </>
    );
};

export default MainPage;
