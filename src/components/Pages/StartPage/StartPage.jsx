import React, { useState, useEffect } from "react";
import './StartPage.css';
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";

const StartPage = () => {
    const { user } = useTelegram();
    const [showModal, setShowModal] = useState(true);
    const [showButtons, setShowButtons] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setShowButtons(true), 300);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            closeModal();
        }
    };

    const buttons = [
        { name: "Переезд", path: "/tool1" },
        { name: "Нашёл другую работу", path: "/tool2" },
        { name: "Закончил учиться/работа по специальности", path: "/tool3" },
        { name: "Низкая зп: мало часов, мало денег, нет премии", path: "/tool4" },
        { name: "Неудобный график работы/не устраивает график", path: "/tool5" },
        { name: "Конфликт с коллективом/дискриминация", path: "/tool6" },
        { name: "Поступил или продолжил учиться/сложно совмещать с учебой", path: "/tool7" },
        { name: "Не разрешают родители", path: "/tool8" },
        { name: "Не разрешает муж", path: "/tool9" },
        { name: "Хочет в длительный отпуск", path: "/tool10" },
        { name: "Идет учиться в школу", path: "/tool11" },
        { name: "Плохие отношения с управленчиским составом ресторана/территории", path: "/tool12" },
        { name: "Проблемы с документами (приписное свидетельство, прививки в ЛМК", path: "/tool13" },
        { name: "Сезонная работа (стройка и др.)/неофициальная работа", path: "/tool14" },
        { name: "Физически/морально тяжелая работа", path: "/tool15" },
        { name: "Не помогают в обучении", path: "/tool16" },
        { name: "Не видит перспектив для карьерного роста", path: "/tool17" },
        { name: "Состояние здоровья", path: "/tool18" },
       
    ];

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
                            <Link key={index} to={button.path} style={{ textDecoration: 'none', width: '100%' }}>
                                <Button className="tool-button">
                                    {button.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;