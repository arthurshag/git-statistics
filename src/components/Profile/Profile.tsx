import React, {FC, memo} from 'react';
import classes from "./Profile.module.scss"
import {IUserWithLoading} from "../../models/IUser";
import {useNavigate} from "react-router-dom";
import Button from "../utils/Button/Button";
import {XIcon} from "@primer/octicons-react";
import Loading from "../utils/Loading/Loading";
import LanguagesContainer from "../Detailed/User/Parts/Languages/Languages";
import EventsUser from "../Detailed/User/Parts/Events/Events";

interface ProfileProps {
    user: IUserWithLoading,
    deleteUser?: () => void
}

const Profile: FC<ProfileProps> = memo(({user, deleteUser}) => {
    const navigate = useNavigate();
    const ProfileComponent = () => {
        return (
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
                <div className={classes.charts}>
                    <LanguagesContainer user={user.login} className={classes.chart}/>
                    <EventsUser username={user.login} className={classes.chart}/>
                </div>
                <div className={classes.btns}>
                    <Button type={"default"} className={classes.btnRepos}
                            onClick={() => navigate(`/user/${user.login}`)}>
                        More info
                    </Button>
                    <Button type={"default"} className={classes.btnRepos}
                            onClick={() => navigate(`/repositories?username=${user.login}`)}>
                        Public repos
                    </Button>
                </div>
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
        return (
            <div className={classes.loadingProfile}>
                <Loading isLoading={true}/>
            </div>
        )
    }

    return user.isLoading ? <LoadingComponent/> : <ProfileComponent/>
});

export default Profile;
