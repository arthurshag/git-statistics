import React, {FC} from 'react';

interface IProps {
    current:number,
    count: number,
    handler: (param:number) => void
}

const Paginator: FC<IProps> = ({count, current, handler}) => {
    const paginatorItems:React.ReactElement[] = [];
    for (let i = 1; i < count; i++) {
        paginatorItems.push(<button key={i} onClick={() => handler(i)}>{i}</button>);
    }

    return (
        <div>
            {paginatorItems}
        </div>
    );
};


export default Paginator;
