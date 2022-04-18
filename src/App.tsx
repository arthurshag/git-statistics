import React from 'react';
import Button from "./components/utils/Button/Button";
import TextInput from "./components/utils/TextInput/TextInput";
import Title from "./components/utils/Title/Title";
import BlockShadow from "./components/utils/BlockShadow/BlockShadow";

function GitStatApp() {

    return (<div style={{padding: 20}}>
            <BlockShadow>
                <BlockShadow style={{width: "600px", marginBottom: 20}}>
                    <Title level={1}>Пажилой татйл</Title>
                    <Title level={2}>Пажилой татйл</Title>
                    <Title level={3}>Пажилой татйл</Title>
                    <Title level={4}>Пажилой татйл</Title>
                </BlockShadow>
                <div style={{display: "flex", gap: 10}}>
                    <Button>Кнопка тык тык</Button>
                    <Button type={"primary"}>Кнопка тык тык</Button>
                    <Button type={"danger"}>Кнопка тык тык</Button>

                    <Button disabled={true}>Кнопка тык тык</Button>
                    <Button disabled={true} type={"primary"}>Кнопка тык тык</Button>
                    <Button disabled={true} type={"danger"}>Кнопка тык тык</Button>
                </div>
                <TextInput label={"Паста"}
                           placeholder={"Твой батя моему в подметки не годится. Мой ебашит вообще адовые блюда. Ну такой вот примерно рецепт усредненный, потому что вариаций масса. Берется суп, он не греется, греть – это не про моего батю. Он берет это суп, вываливает его на сковороду и начинает жарить. Добавляет в него огромное"}/>
                <TextInput label={"Лейбл"} error={"Я ошибка, я чето несу, но точно не радость"}
                           placeholder={"В дверь постучали 8 раз, осьминог подумал штирлиц"}/>
                <TextInput label={"Лейбл"}
                           placeholder={""}/>
            </BlockShadow>
        </div>
    );
}

export default GitStatApp;
