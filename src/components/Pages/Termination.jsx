import React, { useState } from "react";
import Button from "../Buttons/Button";
import { terminationButtons } from "./TerminationButtons";

const Termination = ({ onBack }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedSubOption, setSelectedSubOption] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedTool(terminationButtons[index]);
        setCurrentStep(0);
        setSelectedSubOption(null);
    };

    const handleNextStep = () => {
        if (currentStep < selectedTool.texts.length - 1) {
            setCurrentStep(currentStep + 1);
            setSelectedSubOption(null);
        } else {
            setSelectedTool(null);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedSubOption(null);
        } else {
            setSelectedTool(null);
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

    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            setSelectedTool(null);
        }
    };

    return (
        <div className="termination-wrapper">
            {!selectedTool && (
                <div className="buttons-section">
                    <h3 className="buttons-title">По какой причине твой сотрудник хочет уволиться?</h3>
                    <div className="buttons-container">
                        {terminationButtons.map((button, index) => (
                            <Button 
                                key={index} 
                                className="tool-button"
                                onClick={() => handleButtonClick(index)}
                            >
                                {button.name}
                            </Button>
                        ))}
                    </div>
                    <Button 
                        className="back-button"
                        onClick={onBack}
                    >
                        Назад
                    </Button>
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
                                }}>Закрыть</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Termination;
