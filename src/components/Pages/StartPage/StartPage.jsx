import React, { useState } from "react";
import './StartPage.css';
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Buttons/Button";
import { toBeRequired } from "@testing-library/jest-dom/matchers";

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

        {name: "Низкая ЗП - мало часов", texts: [
            {title: "Спроси сотрудника", content: "Сколько ты получил в последний раз?<hr>Знаешь ли ты, как повлиять на свой доход?"},
            {title: "Что делать?", content: "Подработка в другом ресторане<hr>Обучение на другие станции (универсал, более мобильный, больше часов)<hr>Детальный расчет с директором: сколько хочешь зарабатывать, сколько часов для этого необходимо, составление расписания на месяц вперед<hr>Перевод сотрудника на новую ставку (при соблюдении необходимых условий)"},
            {title: "Преимущества для сотрудника", content: "Увеличение заработной платы<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Низкая ЗП - нет премий", texts: [
            {title: "Спроси сотрудника", content: "Сколько ты получил в последний раз?<hr>Знаешь ли ты, как повлиять на свой доход?"},
            {title: "Что делать?", content: "Предложи перевод  в другой ресторан с сильной потребностью на время для получения сотрудником премии<br>С последующим возвращением при достижении рестораном целевых показателей"},
            {title: "Преимущества для сотрудника", content: "Увеличение заработной платы<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},
        
        {name: "Низкая ЗП - маленький доход", texts: [
            {title: "Спроси сотрудника", content: "Сколько ты получил в последний раз?<hr>Знаешь ли ты, как повлиять на свой доход?"},
            {title: "Что делать?", content: "Карьерное развитие (быть в бенч, пересчет на высшую ставку при выполнении функционала)<hr>Рассказать про премию за часы, подработка в другом ресторане + ресторан, в котором получают премию"},
            {title: "Преимущества для сотрудника", content: "Увеличение заработной платы<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Неудобный/не устраивает график работы", texts: [
            {title: "Спроси сотрудника", content: "Какой график тебе хочется?<hr>На что тебе не хватает времени?<hr>Чему бы ты хотел уделять больше внимания?<hr>Тебе предоставляют смены в те дни/часы, в которые ты хотел бы работать?"},
            {title: "Что делать?", content: "Изменения по графику<hr>Перевод в другой ресторан<hr>Планирование смен на длительный период (месяц)"},
            {title: "Преимущества для сотрудника", content: "Удобный график, чтобы успевать все<hr>Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"}     
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Конфликт с коллективом", texts: [
            {title: "Предложи сотруднику", content: "Провести Кофе с директором с сотрудником тет-а-тет<hr>Провести Кофе с директором совместно с двумя лицами"},
            {title: "Что делать?", content: "Решение конфликта через тет-а-тет<hr>Перевод в другой ресторан<hr>Предоставление равных возможностей/заданий для каждого сотрудинка"},
            {title: "Преимущества для сотрудника", content: "Сохранение места работы<hr>Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Поступил или продолжил учиться/сложно совмещать с учебой", texts: [
            {title: "Спроси сотрудника", content: "Какой график тебе удобен?<hr>В какие дни/часы ты точно сможешь работать?<hr>Сможешь ли ты работать каждое воскресенье? (например)"},
            {title: "Что делать?", content: "Изменение графика под потребность<hr>Перевод в другой ресторан, где возможен озвученный график<hr>Предложение отпуска на время начала учебы и пирода экзамена для адаптации совмещения графика учебы и работы"},
            {title: "Преимущества для сотрудника", content: "Удобный график, чтобы успевать все<hr>Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР<hr>Перекрытие смены в выходные/каникулы/праздничные дни"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Не разрешают родители", texts: [
            {title: "Спроси сотрудника", content: "Спросить о возможности поговорить с родителями<hr>Почему родители против?"},
            {title: "Что делать?", content: "Поговорить с родителями, рассказать про гибкий график, привилегии, пригласить родителей на экскурсию<hr>Изменение/корректировка графика работы"},
            {title: "Преимущества для сотрудника", content: "Удобный график, чтобы успевать все<hr>Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР<hr>Перекрытие смены в выходные/каникулы/праздничные дни"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Не разрешает муж", texts: [
            {title: "Спроси сотрудника", content: "Спросить о возможности поговорить с мужем<hr>Почему муж против?"},
            {title: "Что делать?", content: "Поговорить с мужем, рассказать про гибкий график, привилегии, пригласить мужа на экскурсию<hr>Выбор одного конкретного ресторана для подработки, основные часы в материнском ресторане"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Хочет в длительный отпуск", texts: [
            {title: "Спроси сотрудника", content: "Спросить о причинах?"},
            {title: "Что делать?", content: "Взять отпуск и заявление на увольнение с открытой датой, согласование с ТУ<hr>Поддержание связи с сотрудником, информирование о нововведениях в компании"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Идет учиться в школу", texts: [
            {title: "Спроси сотрудника", content: "Какой график тебе удобен?<hr>В какие дин/часы ты точно сможешь работать?<hr>Сможешь ли ты работать каждое воскресенье?<hr>Спросить о возможности поговорить с родителями"},
            {title: "Что делать?", content: "Изменение графика/ресторана - остаться на непольный рабочий день (выходные, вечер пятницы)<hr>Поговорить с родителями и рассказать про гибкий график, привилегии, пригласить родителей на экскурсию"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход - 40ч = 10.000р.<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР<hr>Перекрытие смены в выходные/каникулы"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Плохие отношения с управленческим составом ресторана/территории", texts: [
            {title: "Спроси сотрудника", content: "Что беспокоит тебя в действиях твоего руководителя?<hr>Проведение тет-а-тет отдельном с каждым сотрудником, потом совместно"},
            {title: "Что делать?", content: "Изменение ресторана<hr>Тет-а-тет с руководителем, ТУ, HR"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Проблемы с документами (приписное свидетельство, прививки в ЛМК)", texts: [
            {title: "Спроси сотрудника", content: "Какие документы?"},
            {title: "Что делать?", content: "Тет-а-тет: требование законодательства, в другой компании такие же запросы (риски: соц.пакет, депортация"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Сезонная работа", texts: [
            {title: "Спроси сотрудника", content: "Чем привлекает сезонная работа на время?\n\n*При ответе использовать подсказки из других причин"},
            {title: "Что делать?", content: "Отпуск: посмотри, попробуй<hr>Привести примеры неудачного опыта других людей (условия жизни, работы, штрафы, заболевания при сидячей работе)<hr>Рассказать про обман, манипуляции, задержки оплаты<hr>Предложение остаться на 0.5 ставки/неполный рабочий день"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход/соц.пакет<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Физически/морально тяжелая работа", texts: [
            {title: "Спроси сотрудника", content: "Какие функции тебе тяжело выполнять?<hr>Что тебя беспокоит?"},
            {title: "Что делать?", content: "Изменение станции<hr>Изменение графика работы (сокращение кол-ва/продолжительности смен)<hr>Изменение ресторана<hr>Тет-а-тет с сотрудником: не бойся просить о помощи, не прыгать выше головы"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Сотруднику не помогают в обучении", texts: [
            {title: "Спроси сотрудника", content: "Как долго ты работаешь в компании?<hr>Есть ли у тебя тренер?<hr>Есть ли у тебя ПО/план развития?<hr>Знаком ли ты с электронной платформой обучения?<hr>С какими трудностями ты столкнулся во время обучения?"},
            {title: "Что делать?", content: "Повторное обучение (через корректировку ПО, смену наставника)<hr>Изменение ресторана (обучение в треннинговом ресторане, обучение в заполненном ресторане)"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы<hr>Дальнейший карьерный рост"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Не видит перспектив для карьерного роста", texts: [
            {title: "Спроси сотрудника", content: "На какой позиции ты сейчас находишься?<hr>Ты знаешь, что нужно сделать для повышения на следующую должность?<hr>Кто твой наставник?<hr>Какой на данный момент у тебя план развития? Какие сроки?"},
            {title: "Что делать?", content: "Рассказать и отобразить в PPR план развития<hr>Изменение ресторана, где есть подходящие открытые вакансии"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы<hr>Дальнейший карьерный рост"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
        ], buttonTexts: ["Что делать?", "Что получит твой сотрудник?", "Что получит твой ресторан?", "Закрыть"]},

        {name: "Состояние здоровья", texts: [
            {title: "Спроси сотрудника", content: "Что тебя беспокоит, какие жалобы?<hr>Обращался ли ты к специалисту?"},
            {title: "Что делать?", content: "Зафиксировать период развития и должности для развития с указанием сроков<hr>Записать на ближайший Assessment-centre"},
            {title: "Преимущества для сотрудника", content: "Сохранение заработной платы/стабильный доход<hr>Корпоративные льготы<hr>Дальнейший карьерный рост"},
            {title: "Преимущества для ресторана", content: "Снижение выбытия<hr>Сохранение кадровой единицы - ВКР"}
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