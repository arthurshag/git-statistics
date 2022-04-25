import React, {FC} from 'react';
import classes from "./Profile.module.scss"
import {IUser, IUserWithLoading} from "../../models/IUser";
import {Link} from "react-router-dom";

interface ProfileProps {
    user: IUserWithLoading,
    deleteUser?: ()=>void
}

const Profile: FC<ProfileProps> = ({user, deleteUser}) => {

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
                <Link className={classes.btnRepos} to={`/repositories?username=${user.login}`}>
                    Public repos
                </Link>
                {deleteUser &&
                    <div
                        onClick={deleteUser}
                        className={classes.profileDelBtn}
                    >Del</div>
                }
            </div>
        )
    }

    const LoadingComponent = () => {
        return(
            <div className={classes.loadingProfile}>
                Loading...
            </div>
        )
    }

    return user.isLoading ? <LoadingComponent/> : <ProfileComponent/>
};

export default Profile;
