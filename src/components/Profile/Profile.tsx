import React, {FC} from 'react';
import classes from "./Profile.module.scss"
import {IUser, IUserWithLoading} from "../../models/IUser";
import {Link} from "react-router-dom";

interface ProfileProps {
    user: IUserWithLoading,
    deleteUser?: ()=>void
}

const Profile: FC<ProfileProps> = ({user, deleteUser}) => {
    return (
        <div className={classes.profile}>
            <img src={user.avatar_url} alt="avatar" className={classes.profileImg}/>
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
                <button disabled={user.isLoading}
                        className={classes.profileRow}>{user.public_repos} Public repos
                </button>
            </Link>
            {user.isLoading &&
            <div className={classes.loadingProfile}>
                Loading...
            </div>
            }
            {deleteUser &&
                <div
                    onClick={deleteUser}
                    className={classes.profileDelBtn}
                >Del</div>
            }
        </div>


    );
};

export default Profile;
