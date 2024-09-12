import React, { useState, useEffect } from "react";
import './StartPage.css';
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// const buttonsData = {
//     main: [
//         { label: "PEOPLE", link: null },
//         { label: "PLACE", link: null },
//         { label: "PROMO", link: "#" },
//         { label: "PRODUCT", link: "#" }
//     ],
//     months: {
//         PEOPLE: [
//             { label: "Январь", link: null },
//             { label: "Февраль", link: null },
//             { label: "Март", link: null },
//             { label: "Апрель", link: null },
//             { label: "Май", link: null },
//             { label: "Июнь", link: null },
//             { label: "Июль", link: null },
//             { label: "Август", link: null },
//             // { label: "Сентябрь", link: null },
//             // { label: "Октябрь", link: null },
//             // { label: "Ноябрь", link: null },
//             // { label: "Декабрь", link: null }
//         ],
//         PLACE: [
//             { label: "Январь", link: null },
//             { label: "Февраль", link: null },
//             { label: "Март", link: null },
//             { label: "Апрель", link: null },
//             { label: "Май", link: null },
//             { label: "Июнь", link: null },
//             { label: "Июль", link: null },
//             { label: "Август", link: null },
//             // { label: "Сентябрь", link: null },
//             // { label: "Октябрь", link: null },
//             // { label: "Ноябрь", link: null },
//             // { label: "Декабрь", link: null }
//         ],
//         PROMO: [
//             // { label: "Январь", link: null },
//             // { label: "Февраль", link: null },
//             // { label: "Март", link: null },
//             // { label: "Апрель", link: null },
//             // { label: "Май", link: null },
//             // { label: "Июнь", link: "/promo/june" },
//             // { label: "Июль", link: "/promo/july" },
//             { label: <span><span className="highlight">new</span> Август</span>, link: "/promo/august" },
//             // { label: "Сентябрь", link: null },
//             // { label: "Октябрь", link: null },
//             // { label: "Ноябрь", link: null },
//             // { label: "Декабрь", link: null }
//         ],
//         PRODUCT: [
//             // { label: "Январь", link: null },
//             // { label: "Февраль", link: null },
//             // { label: "Март", link: null },
//             // { label: "Апрель", link: null },
//             // { label: "Май", link: null },
//             { label: "Июнь", link: "/product/june" },
//             { label: <span><span className="highlight">new</span> Июль</span>, link: "/product/july" },
//             // { label: "Август", link: "/product/august" },
//             // { label: "Сентябрь", link: null },
//             // { label: "Октябрь", link: null },
//             // { label: "Ноябрь", link: null },
//             // { label: "Декабрь", link: null }
//         ]
//     }
// };

const StartPage = ({ currentCategory }) => {
    const { user, tg } = useTelegram();
    // const [isModalOpen, setModalOpen] = useState(false);
    // const [currentButtons, setCurrentButtons] = useState(buttonsData.main);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (currentCategory) {
    //         setSelectedCategory(currentCategory);
    //         setCurrentButtons(buttonsData.months[currentCategory] || []);
    //         setModalOpen(true);
    //     } else {
    //         setCurrentButtons(buttonsData.main);
    //         setSelectedCategory(null);
    //     }
    // }, [currentCategory]);

    // const openModal = () => setModalOpen(true);
    // const closeModal = () => {
    //     setModalOpen(false);
    //     setCurrentButtons(buttonsData.main);
    //     setSelectedCategory(null);
    // };

    // const handleMainButtonClick = (buttonLabel) => {
    //     if (buttonLabel === "Назад") {
    //         if (selectedCategory) {
    //             setCurrentButtons(buttonsData.main);
    //             setSelectedCategory(null);
    //         } else {
    //             closeModal();
    //         }
    //     } else {
    //         setSelectedCategory(buttonLabel);
    //         setCurrentButtons(buttonsData.months[buttonLabel] || []);
    //     }
    // };

    // const handleMonthClick = (link) => {
    //     if (link) {
    //         closeModal();
    //         navigate(link);
    //     } else {
    //         alert("Скоро будет");
    //     }
    // };

    return (
        <div className="StartPage_wrapper">
            <div className="StartPage_text_wrapper">
                <div className="StartPage_username">
                    <b>Привет, {user?.first_name}!<br /></b>
                </div>
                <div className="StartPage_description">
                    Мы собрали главные новости PEOPLE, PRODUCT, PROMO, PLACE в одном месте!<br />
                </div>
                <div className="StartPage_description_plus">
                    Ты можешь выбрать интересующий тебя блок и месяц, чтобы всегда быть в курсе текущих, а также прошлых новостей!<br />
                </div>
                <Link to='/sections'>
                <Button className="startpage-button">
                    Выбрать
                </Button>
                </Link>
            </div>

            {/* {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {currentButtons.map((button, index) => (
                            <Button
                                key={index}
                                className="modal-button"
                                onClick={() => {
                                    if (selectedCategory) {
                                        handleMonthClick(button.link);
                                    } else if (button.link === null) {
                                        alert("Скоро будет");
                                    } else {
                                        handleMainButtonClick(button.label);
                                    }
                                }}
                            >
                                {button.label}
                            </Button>
                        ))}
                        <Button className="modal-button" onClick={() => handleMainButtonClick("Назад")}>
                            Назад
                        </Button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default StartPage;
