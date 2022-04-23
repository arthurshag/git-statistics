import React, {FC} from 'react';
import {Link} from "react-router-dom";
import Title from "../../../utils/Title/Title";
import {useGetUserQuery} from "../../../../redux/reducers/UserReducer/UserRTK";
import Loading from "../../../utils/Loading/Loading";
import ErrorGate from "../../../utils/ErrorGate/ErrorGate";
import classes from "./Profile.module.scss";
import LinkGit from "../../../utils/LinkGit/LinkGit";
import {PersonIcon} from "@primer/octicons-react";
import IconWrapper from "../../../utils/IconWrapper/IconWrapper";

interface IProps {
    username: string,
    title?: string
}

const Profile: FC<IProps> = ({username, title = "User"}) => {
    const {data: user, isLoading, error} = useGetUserQuery({username: username})

    return (<Loading isLoading={isLoading}>
        <ErrorGate error={error as string | null | undefined}>
            {user && <div className={classes.user}>
                <div className={classes.userData}>
                    <Title level={3}>
                        <IconWrapper Icon={PersonIcon}/> {title}:{" "}
                        <LinkGit inner={{url: `/user/${user.login}`, text: user.login}} githubUrl={user.html_url}/>
                    </Title>
                    <div className={classes.item}>Type: {user.type}</div>
                    <div className={classes.item}>Public gists: {user.public_gists}</div>
                    <div className={classes.item}>Followers: {user.followers}</div>
                    <div className={classes.item}>Following: {user.following}</div>
                    {user.email && <div className={classes.item}>Email: {user.email}</div>}
                    <Link to={`/repositories?username=${user.login}`} className={classes.item}>
                        Public repos: {user.public_repos}
                    </Link>
                </div>
                <div className={classes.userBlockImg}><img src={user.avatar_url} alt={"avatar"}/></div>
            </div>}
        </ErrorGate>
    </Loading>);
};


export default Profile;
