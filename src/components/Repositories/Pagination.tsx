import React, {FC} from 'react';

interface IProps {
    current: number,
    count: number,
    pageHandler: (page: number) => void
}

const Pagination: FC<IProps> = ({count, current, pageHandler}) => {
    const paginatorItems: React.ReactElement[] = [];
    for (let i = 1; i <= count; i++) {
        paginatorItems.push(<button style={i === current ? {background: "#ff6363"} : undefined} key={i}
                                    onClick={() => pageHandler(i)}>{i}</button>);
    }

    return (
        <div>
            {paginatorItems}
        </div>
    );
};


export default Pagination;
