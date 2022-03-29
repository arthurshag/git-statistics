import React, {FC} from 'react';
import classes from "./Profile.module.scss"
import {IUser} from "../../models/IUser";
import {useAppDispatch} from "../../redux/hooks/reduxHooks";
import {fetchReps} from "../../redux/reducers/UserReducer/ReposActionCreators";

interface ProfileProps {
    user: IUser,
    isLoading: boolean
}

const Profile: FC<ProfileProps> = ({user, isLoading}) => {
    const dispatch = useAppDispatch();
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
            <button disabled={isLoading} onClick={() => dispatch(fetchReps(user.login))}
                    className={classes.profileRow}>{user.public_repos} Public repos
            </button>
            {isLoading &&
            <div className={classes.loadingProfile}>
                Loading...
            </div>
            }
        </div>


    );
};

export default Profile;
