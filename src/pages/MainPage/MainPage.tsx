import React, {FC, useEffect, useState} from 'react';
import classes from "./MainPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {fetchUser} from "../../redux/reducers/UserReducer/ActionCreators";
import FormLogin from "../../components/FormLogin/FormLogin";
import Profile from "../../components/Profile/Profile";
import User from "../../components/User/User";
import {userSlice} from "../../redux/reducers/UserReducer/UserSlice";
import BlockShadow from "../../components/utils/BlockShadow/BlockShadow";
import IconWrapper from "../../components/utils/IconWrapper/IconWrapper";
import {PeopleIcon, PersonAddIcon, RepoIcon, ScreenNormalIcon} from "@primer/octicons-react";
import Title from "../../components/utils/Title/Title";
import Button from "../../components/utils/Button/Button";


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

    return (
        <BlockShadow className={classes.wrapper}>
            <Title level={2}><IconWrapper Icon={PeopleIcon}/> Users</Title>
            <div className={classes.container}>
                <div className={classes.users}>
                    {users.map((user, index) => {
                        return(
                            <User user={user} index={index}/>
                        )
                    })}
                </div>
                {/*<img src="https://ghchart.rshah.org/TalisMan701" alt="TalisMan701 Github chart" />*/}
            </div>
            <Button
                type={"primary"}
                onClick={()=>dispatch(userSlice.actions.addNewUser())}
                className={classes.addUserBtn}
            ><IconWrapper className={classes.iconWrapper} Icon={PersonAddIcon}/>Add user</Button>
        </BlockShadow>
    );
};

export default MainPage;
