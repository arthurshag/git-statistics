import React, {FC, useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import Button from "../../../utils/Button/Button";
import classes from "./Decsription.module.scss";
import {ReactComponent as ExpandIcon} from "./../../../../assets/icons/expand.svg";

interface IProps {
    description: string,
    className?: string
}

const Description: FC<IProps> = ({description, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!textRef.current) {
            return;
        }

        if (textRef.current.scrollHeight > textRef.current.offsetHeight)
            setIsOverflow(true);
    }, [textRef.current])

    return (
        <div className={classNames(classes.description, className)}>
            <div className={classes.description__title}>
                <span className={classes.description__titleText}>Description:{" "}</span>
                {isOverflow &&
                <Button className={classNames(classes.description__btn)}
                        type={isOpen ? "primary" : undefined}
                        onClick={() => setIsOpen((prev) => !prev)}>
                    <ExpandIcon/>
                </Button>}
            </div>
            <span className={classNames(classes.description__text, isOpen && classes.description__text_open)}
                  ref={textRef}>
                {description}
            </span>
        </div>)
};

export default Description;
