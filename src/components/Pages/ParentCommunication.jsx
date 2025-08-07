import React, { useState } from "react";
import Button from "../Buttons/Button";
import { parentCommunicationSteps } from "./ParentCommunicationData";

const ParentCommunication = ({ onBack }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepHistory, setStepHistory] = useState([0]); // История переходов
    const currentStepData = parentCommunicationSteps[currentStep];

    const handleButtonClick = (action) => {
        switch (action) {
            case "next":
                if (currentStep < parentCommunicationSteps.length - 1) {
                    const nextStep = currentStep + 1;
                    setCurrentStep(nextStep);
                    setStepHistory([...stepHistory, nextStep]);
                }
                break;
            case "back":
                if (stepHistory.length > 1) {
                    // Убираем текущий шаг из истории
                    const newHistory = stepHistory.slice(0, -1);
                    const previousStep = newHistory[newHistory.length - 1];
                    setCurrentStep(previousStep);
                    setStepHistory(newHistory);
                }
                break;
            case "not_satisfied":
                // Переход к шагу 4 (разбор проблем)
                setCurrentStep(3);
                setStepHistory([...stepHistory, 3]);
                break;
            case "satisfied":
                // Переход к шагу 6 (продолжение работы)
                setCurrentStep(5);
                setStepHistory([...stepHistory, 5]);
                break;
            case "discussed_yes":
                // Переход к шагу 7 (обсуждение решения)
                setCurrentStep(6);
                setStepHistory([...stepHistory, 6]);
                break;
            case "discussed_no":
                // Переход к шагу 10 (опасения)
                setCurrentStep(9);
                setStepHistory([...stepHistory, 9]);
                break;
            case "continue_yes":
                // Переход к шагу 7 (обсуждение решения)
                setCurrentStep(6);
                setStepHistory([...stepHistory, 6]);
                break;
            case "continue_no":
                // Переход к шагу 10 (опасения)
                setCurrentStep(9);
                setStepHistory([...stepHistory, 9]);
                break;
            case "not_continue":
                // Переход к шагу 8 (отказ)
                setCurrentStep(7);
                setStepHistory([...stepHistory, 7]);
                break;
            case "ready_to_continue":
                // Переход к шагу 9 (преимущества)
                setCurrentStep(8);
                setStepHistory([...stepHistory, 8]);
                break;
            case "finish":
                // Возврат в главное меню
                onBack();
                break;
            case "concern_study":
                // Переход к шагу 11 (объяснение про учебу)
                setCurrentStep(10);
                setStepHistory([...stepHistory, 10]);
                break;
            case "concern_prestige":
                // Переход к шагу 12 (объяснение про престиж)
                setCurrentStep(11);
                setStepHistory([...stepHistory, 11]);
                break;
            case "concern_salary":
                // Переход к шагу 13 (объяснение про зарплату)
                setCurrentStep(12);
                setStepHistory([...stepHistory, 12]);
                break;
            default:
                break;
        }
    };

    const createMarkup = (content) => {
        return { __html: content };
    };

    return (
        <div className="parent-communication-wrapper">
            <div className="content-section">
                <h3>{currentStepData.title}</h3>
                
                <div 
                    className="step-content"
                    dangerouslySetInnerHTML={createMarkup(currentStepData.content)}
                />
                
                <div className="navigation-buttons">
                    {currentStepData.buttons.map((button, index) => {
                        // Если это первый шаг и кнопка "Назад", заменяем на "Назад к меню"
                        if (currentStep === 0 && button.action === 'back') {
                            return (
                                <Button
                                    key={index}
                                    className="nav-button back-nav-button"
                                    onClick={onBack}
                                >
                                    Назад к меню
                                </Button>
                            );
                        }
                        
                        // Определяем класс кнопки в зависимости от цвета
                        let buttonClassName = `nav-button ${button.action === 'back' ? 'back-nav-button' : 'next-nav-button'}`;
                        
                        // Добавляем класс цвета, если он указан
                        if (button.color) {
                            buttonClassName += ` ${button.color}-button`;
                        }
                        
                        return (
                            <Button
                                key={index}
                                className={buttonClassName}
                                onClick={() => handleButtonClick(button.action)}
                            >
                                {button.text}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ParentCommunication;
