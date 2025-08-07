import React, { useState } from "react";
import './StartPage.css';
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Buttons/Button";
import Termination from "../Termination";
import ParentCommunication from "../ParentCommunication";

const StartPage = () => {
    const { user } = useTelegram();
    const [showModal, setShowModal] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [currentView, setCurrentView] = useState('main'); // 'main', 'termination', 'parent-communication'

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setShowOptions(true), 200);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            closeModal();
        }
    };

    const handleOptionClick = (option) => {
        setCurrentView(option);
        setShowOptions(false);
    };

    const handleBackToMain = () => {
        setCurrentView('main');
        setShowOptions(true);
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
            
            {currentView === 'main' && showOptions && (
                <div className="options-section">
                    
                    <div className="options-container">
                    <h2 className="options-title">Выбери раздел</h2>
                        <Button 
                            className="option-button"
                            onClick={() => handleOptionClick('termination')}
                        >
                            Твой сотрудник хочет уволиться?
                        </Button>
                        <div className="button-divider"></div>
                        <Button 
                            className="option-button"
                            onClick={() => handleOptionClick('parent-communication')}
                        >
                            Как общаться с родителями сотрудника?
                        </Button>
                    </div>
                </div>
            )}
            
            {currentView === 'termination' && (
                <Termination onBack={handleBackToMain} />
            )}
            
            {currentView === 'parent-communication' && (
                <ParentCommunication onBack={handleBackToMain} />
            )}
        </div>
    );
};

export default StartPage;