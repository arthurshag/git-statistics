import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import Button from "../utils/Button/Button";
import IconWrapper from "../utils/IconWrapper/IconWrapper";
import {XIcon} from "@primer/octicons-react";
import classes from "./Messages.module.scss"
import BlockShadow from "../utils/BlockShadow/BlockShadow";
import {profileSlice} from "../../redux/reducers/ProfileReducer/ProfileSlice";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import "./Animation.scss";

const Messages: FC = () => {
    const messages = useAppSelector(state => state.profileReducer.messages);
    const dispatch = useAppDispatch();
    const onClose = (i: number) => {
        dispatch(profileSlice.actions.clearMessage({id: i}))
    }
    return (
        <section className={classes.messages}>
            <TransitionGroup className="todo-list">
                {messages.map((e, i) => <CSSTransition
                    timeout={800}
                    key={i}
                    classNames="animation">
                    <Message onClose={() => onClose(i)}>{e.value}</Message>
                </CSSTransition>)}
            </TransitionGroup>
        </section>
    );
};


const Message: FC<{ onClose: () => void, key?: number }> = ({children, onClose}) => {
    return (
        <BlockShadow className={classes.message}>
            <span>{children}</span>
            <Button className={classes.message__close} onClick={onClose}><IconWrapper Icon={XIcon}/></Button>
        </BlockShadow>
    );
};

export default Messages;
