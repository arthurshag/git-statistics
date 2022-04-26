import React, {FC} from 'react';
import Button from "../../utils/Button/Button";
import IconWrapper from "../../utils/IconWrapper/IconWrapper";
import {CopyIcon, ListUnorderedIcon} from "@primer/octicons-react";

interface IProps {
    changeReposViewType: (e: "list" | "tile") => void,
    reposViewType: "list" | "tile"
}

const UIFilters: FC<IProps> = ({changeReposViewType, reposViewType}) => {
    return (
        <>
            <Button onClick={() => changeReposViewType("tile")}
                    type={reposViewType === "tile" ? "primary" : undefined}>
                <IconWrapper Icon={CopyIcon}/>
            </Button>
            <Button onClick={() => changeReposViewType("list")}
                    type={reposViewType === "list" ? "primary" : undefined}>
                <IconWrapper Icon={ListUnorderedIcon}/>
            </Button>
        </>
    );
};


export default UIFilters;



