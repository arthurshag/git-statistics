import React, {FC, memo} from 'react';

interface IProps {
    current: number,
    count: number,
    pageHandler: (page: number) => void

}

//todo: maybe add in configure
const countNeighbours = 2;

const Pagination: FC<IProps> = memo(({count, current, pageHandler}) => {
    if (count === 0 || count === 1)
        return <></>;
    console.log(count);
    const paginatorItems: React.ReactElement[] = [];
    if (current - countNeighbours > 1) {
        paginatorItems.push(<button key={"hohol"}>{"..."}</button>)
    }
    for (let i = Math.max(current - 2, 1); i <= Math.min(current + countNeighbours, count); i++) {
        paginatorItems.push(<Elem key={i} isCurrent={current === i} page={i} pageHandler={pageHandler}/>);
    }
    if (current + countNeighbours < count) {
        paginatorItems.push(<button key={"hohol"}>{"..."}</button>);
        paginatorItems.push(<Elem key={count} isCurrent={current === count} page={count} pageHandler={pageHandler}/>);
    }

    return (
        <div>
            <button disabled={current === 1} onClick={() => pageHandler(current - 1)}>Left</button>
            {paginatorItems}
            <button disabled={current === count} onClick={() => pageHandler(current + 1)}>Right</button>
        </div>
    );
});

const Elem: FC<{ isCurrent: boolean, page: number, pageHandler: (page: number) => void }> = ({
                                                                                                 isCurrent,
                                                                                                 page,
                                                                                                 pageHandler
                                                                                             }) => {
    return <button style={isCurrent ? {background: "#ff6363"} : undefined}
                   onClick={() => pageHandler(page)}>{page}</button>
}


export default Pagination;
