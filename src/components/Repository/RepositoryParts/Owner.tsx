import React, {FC} from 'react';
import {IRepository} from "../../../models/IRepository";

interface IProps {
    owner: IRepository["owner"]
}
const Owner: FC<IProps> = ({owner}) => {

    return (<div>
        <div>Owner: {owner.type}</div>
        <div>Login {owner.login}</div>
        <div><img src={owner.avatar_url}/></div>
        <div><a href={owner.html_url}>Open Profile in Github</a></div>
    </div>);
};


export default Owner;
