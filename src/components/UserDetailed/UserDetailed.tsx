import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Loading from "../utils/Loading/Loading";
import BlockShadow from "../utils/BlockShadow/BlockShadow";

const UserDetailed: FC = (props) => {
    const params = useParams();
    return (
        <BlockShadow>
            <Loading isLoading={false}>
            </Loading>
        </BlockShadow>);
};


export default UserDetailed;
