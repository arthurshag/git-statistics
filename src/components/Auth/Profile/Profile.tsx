import React, {FC} from "react";
import {IUser} from "../../../models/IUser";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {logout} from "../../../redux/reducers/ProfileReducer/ActionCreators";
import Button from "../../utils/Button/Button";
import classes from "./Profile.module.scss";

interface IProps {
    user: IUser
}

const Profile: FC<IProps> = ({user}) => {
    const dispatch = useAppDispatch();

    function onSubmit() {
        dispatch(logout());
    }

    return (<>
            <p className={classes.text}>Hello {user.login}</p>
            <Button onClick={onSubmit}>REMOVE TOKEN</Button>
        </>
    );
};

export default Profile;
