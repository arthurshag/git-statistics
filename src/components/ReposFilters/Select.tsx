import React, {FC} from "react";

interface IProps {
    options: string[],
    handler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

//todo: use library instead this
const Select: FC<IProps> = ({
                                options,
                                handler
                            }) => {
    const optionsUI = options.map((e) => {
        return <option key={e}>{e}</option>
    })
    return <select onChange={handler}>
        {optionsUI}
        </select>
}

export default Select;
