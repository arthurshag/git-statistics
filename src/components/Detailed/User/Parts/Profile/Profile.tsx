import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as Icon} from "./../../../../../assets/icons/link.svg";
import Title from "../../../../utils/Title/Title";
import {useGetUserQuery} from "../../../../../redux/reducers/UserReducer/UserRTK";
import Loading from "../../../../utils/Loading/Loading";
import ErrorGate from "../../../../utils/ErrorGate/ErrorGate";
import classes from "./Profile.module.scss";

interface IProps {
    username: string
}

const Profile: FC<IProps> = ({username}) => {
    const {data: user, isLoading, error} = useGetUserQuery({username: username})

    return (<Loading isLoading={isLoading}>
        <ErrorGate error={error as string | null | undefined}>
            {user && <div className={classes.user}>
                <div className={classes.userData}>
                    <Title level={3}>User:{" "}
                        <Link to={`users/${user.login}`}>{user.login}</Link> {" "}
                        <a href={user.html_url} target="_blank" rel="noopener">
                            <Icon/>
                        </a>
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
