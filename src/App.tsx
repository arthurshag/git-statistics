import React from 'react';
import Button from "./components/utils/Button/Button";
import TextInput from "./components/utils/TextInput/TextInput";

function GitStatApp() {

    return (<div style={{padding: 20}}>
            <Button>Кнопка тык тык</Button>
            <TextInput label={"Паста"}
                       placeHolder={"Твой батя моему в подметки не годится. Мой ебашит вообще адовые блюда. Ну такой вот примерно рецепт усредненный, потому что вариаций масса. Берется суп, он не греется, греть – это не про моего батю. Он берет это суп, вываливает его на сковороду и начинает жарить. Добавляет в него огромное"}/>
        </div>
    );
}

export default GitStatApp;
