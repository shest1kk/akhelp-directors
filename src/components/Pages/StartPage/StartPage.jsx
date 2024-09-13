import React, { useState } from "react";
import './StartPage.css';
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Buttons/Button";

const StartPage = () => {
    const { user } = useTelegram();
    const [showModal, setShowModal] = useState(true);
    const [showButtons, setShowButtons] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedSubOption, setSelectedSubOption] = useState(null);

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setShowButtons(true), 300);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            closeModal();
            setSelectedTool(null); // Close any open tool modal
            setShowButtons(true); // Show buttons again
        }
    };

    const buttons = [
        { name: "Переезд", texts: [
            { title: "Спроси сотрудника", content: 'В какой город?<hr>Есть ли там рестораны KFC?<hr>Хотел бы ты продолжить работу в KFC?' },
            { title: "Что делать?", content: 'Предложи перевод в ресторан ROSTICS в этом городе/ресторан другой франшизы<hr>При согласии сотрудника сообщить об этом HRM (для организации перевода)' },
            { title: "Преимущество для сотрудника", content: 'Сохранение заработной платы/стабильный доход<hr>Возможность продолжить развитие<hr>Знакомая работа<br>(не будет стресса начинать с "0")' },
            { title: "Преимущество для ресторана", content: "Снижение выбытия<hr>Сохранение лояльности сотрудника к бренду" }
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"] },

        {name: "Нашел другую работу", texts : [
            {title: "Спроси сотрудника", content: "Какая работа?<hr>Какую заработную плату предлагают?<hr>Чем эта работа более привлекательна для тебя?<hr>Важно понять основную причину выбора другого места работы"},
            {title: "Что делать?", content: "Предложение, исходя из возможностей компании/потребностей сотрудника + возможность изменить сферу деятельности (уйти в офис)" },
            {title: "Преимущество для сотрудника", content: "Знакомая компания/знакомые условия, не требуется дополнительная адаптация<hr>Сохранение стажа работа, что влияет на сумму выплат: бл, декретные, отпускные, хранитель стандартов (МС)<hr>Корпоративные льготы" },
            {title: "Преимущество для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР" }
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"],},

        {name: "Закончил учиться/работа по специальности", texts: [
            {title: "Спроси сотрудника", content: "Куда пойдешь работать?<hr>Какая ЗП?<hr>Чем эта работа более привлекательная для тебя?<hr>Что может повлиять на твое решение остаться в компании, например, карьерный рост?" },
            {title: "Что делать?", content: "Рассказать о возможностях карьерного роста (увеличение ЗП)<hr>Предложение смены направления деятельности - работа в офисе<hr>Оформление на 0.5 ставки" },
            {title: "Преимущество для сотрудника", content: "При понимании, что сотрудник может получать ЗП больше у нас, вместе просчитать с ним финансовую выгоду остаться в ЭйКей<hr>Опыт по профессии внутри компании<hr>Дополнительные деньги и 'запасной вариант'<hr>Корпоративные льготы" },
            {title: "Преимущество для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР" }
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},
    ]


    const handleButtonClick = (index) => {
        setSelectedTool(buttons[index]);
        setCurrentStep(0);
        setSelectedSubOption(null);
        setShowButtons(false);
    };

    const handleNextStep = () => {
        if (currentStep < selectedTool.texts.length - 1) {
            setCurrentStep(currentStep + 1);
            setSelectedSubOption(null);
        } else {
            setSelectedTool(null);
            setShowButtons(true);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedSubOption(null);
        } else {
            setSelectedTool(null);
            setShowButtons(true);
        }
    };

    const handleSubOptionClick = (subOption) => {
        setSelectedSubOption(subOption);
    };

    const createMarkup = (content) => {
        return { __html: content };
    };

    const formatContent = (content) => {
        return <div dangerouslySetInnerHTML={createMarkup(content)} />;
    };

    return (
        <div className="StartPage_wrapper">
            {showModal && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <h2>Привет, {user?.first_name}👋🏻</h2>
                        <p>Я твой помощник, здесь ты сможешь найти инструменты для твоей очень важной работы!</p>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
            {showButtons && (
                <div className="buttons-section">
                    <h3 className="buttons-title">По какой причине твой сотрудник хочет уволиться?</h3>
                    <div className="buttons-container">
                        {buttons.map((button, index) => (
                            <Button 
                                key={index} 
                                className="tool-button"
                                onClick={() => handleButtonClick(index)}
                            >
                                {button.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            {selectedTool && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <h3>{selectedTool.texts[currentStep].title}</h3>
                        {selectedTool.texts[currentStep].subOptions ? (
                            <>
                                <p>{formatContent(selectedTool.texts[currentStep].content)}</p>
                                <div className="sub-options">
                                    {selectedTool.texts[currentStep].subOptions.map((subOption, index) => (
                                        <Button
                                            key={index}
                                            className="sub-option-button"
                                            onClick={() => handleSubOptionClick(subOption)}
                                        >
                                            {subOption.name}
                                        </Button>
                                    ))}
                                </div>
                                {selectedSubOption && (
                                    <p>{formatContent(selectedSubOption.content)}</p>
                                )}
                            </>
                        ) : (
                            <p>{formatContent(selectedTool.texts[currentStep].content)}</p>
                        )}
                        <div className="button-container">
                            {currentStep > 0 && (
                                <button onClick={handlePreviousStep}>Назад</button>
                            )}
                            {currentStep < selectedTool.texts.length - 1 ? (
                                <button onClick={handleNextStep}>
                                    {selectedTool.buttonTexts[currentStep]}
                                </button>
                            ) : (
                                <button onClick={() => {
                                    setSelectedTool(null);
                                    setShowButtons(true);
                                }}>Закрыть</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;