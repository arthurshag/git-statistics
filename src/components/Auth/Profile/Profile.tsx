import React, {FC} from "react";
import {IUser} from "../../../models/IUser";
import {useAppDispatch} from "../../../redux/hooks/reduxHooks";
import {logout} from "../../../redux/reducers/ProfileReducer/ActionCreators";

interface IProps {
    user: IUser
}

const Profile: FC<IProps> = ({user}) => {
    const dispatch = useAppDispatch();

    function onSubmit() {
        dispatch(logout());
    }

    return (<>
            <div>Hello {user.name}</div>
            <button onClick={onSubmit}>REMOVE TOKEN</button>
        </>
    );
};

export default Profile;
