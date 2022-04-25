import React, {FC, memo} from 'react';
import Button from "../Button/Button";
import classes from "./Pagination.module.scss";

interface IProps {
    current: number,
    count: number,
    pageHandler: (page: number) => void,
    disabled?: boolean
}

const countNeighbours = 2;

const Pagination: FC<IProps> = memo(({count, current, pageHandler, disabled = false}) => {
    if (count === 0 || count === 1)
        return <></>;
    const paginatorItems: React.ReactElement[] = [];
    if (current - countNeighbours > 1) {
        paginatorItems.push(<Elem disabled={disabled} key={1} isCurrent={current === 1} page={1}
                                  pageHandler={pageHandler}/>);
        paginatorItems.push(<Button key={"left"}>{"..."}</Button>)
    }
    for (let i = Math.max(current - 2, 1); i <= Math.min(current + countNeighbours, count); i++) {
        paginatorItems.push(<Elem key={i} isCurrent={current === i} page={i} pageHandler={pageHandler}
                                  disabled={disabled}/>);
    }
    if (current + countNeighbours < count) {
        paginatorItems.push(<Button key={"right"}>{"..."}</Button>);
        paginatorItems.push(<Elem key={count} isCurrent={current === count} page={count} pageHandler={pageHandler}/>);
    }

    return (
        <div>
            <Button disabled={current === 1 || disabled} onClick={() => pageHandler(current - 1)}>Left</Button>
            {paginatorItems}
            <Button disabled={current === count || disabled} onClick={() => pageHandler(current + 1)}>Right</Button>
        </div>
    );
});

interface IElemProps {
    isCurrent: boolean,
    page: number,
    pageHandler: (page: number) => void,
    disabled?: boolean
}

const Elem: FC<IElemProps> = ({
                                  isCurrent,
                                  page,
                                  pageHandler,
                                  disabled = false
                              }) => {
    return <Button disabled={disabled} onClick={() => pageHandler(page)}
                   className={isCurrent ? classes.active : undefined}>{page}</Button>
}


export default Pagination;
