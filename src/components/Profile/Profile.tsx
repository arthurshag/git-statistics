import React, {FC} from 'react';
import classes from "./Profile.module.scss"
import {IUser, IUserWithLoading} from "../../models/IUser";
import {Link, useNavigate} from "react-router-dom";
import Button from "../utils/Button/Button";
import {XIcon} from "@primer/octicons-react";
import Loading from "../utils/Loading/Loading";

interface ProfileProps {
    user: IUserWithLoading,
    deleteUser?: ()=>void
}

const Profile: FC<ProfileProps> = ({user, deleteUser}) => {
    const navigate = useNavigate()
    const ProfileComponent = () => {
        return(
            <div className={classes.profile}>
                <img src={user.avatar_url} alt={user.name ?? "user"} className={classes.profileImg}/>
                {user.name &&
                    <div className={classes.profileRow}>{user.name}</div>
                }
                {user.bio &&
                    <div className={classes.profileRow}>{user.bio}</div>
                }
                {user.email &&
                    <div className={classes.profileRow}>{user.email}</div>
                }
                {user.location &&
                    <div className={classes.profileRow}>{user.location}</div>
                }
                <div className={classes.profileRow}>{user.followers} Followers</div>
                <div className={classes.profileRow}>{user.following} Following</div>
                <Button type={"default"} className={classes.btnRepos} onClick={() => navigate(`/repositories?username=${user.login}`)}>
                    Public repos
                </Button>
                {deleteUser &&
                    <div
                        onClick={deleteUser}
                        className={classes.profileDelBtn}
                    ><XIcon size={24}/></div>
                }
            </div>
        )
    }

    const LoadingComponent = () => {
        return(
            <div className={classes.loadingProfile}>
                <Loading isLoading={true}/>
            </div>
        )
    }

    return user.isLoading ? <LoadingComponent/> : <ProfileComponent/>
};

export default Profile;
