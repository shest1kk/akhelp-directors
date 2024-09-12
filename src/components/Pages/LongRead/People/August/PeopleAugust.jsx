// AugustPeople.jsx
import React, { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import '../../LongRead.css';
import { Link, useNavigate } from "react-router-dom";
import ModalLinks from "../../../ModalLinks/ModalLinks";

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../../../../assets/PEOPLE/August', false, /\.(jpg|jpeg|png)$/));

const links = {
  'Skillaz': 'https://cloud.akrussia.com/index.php/s/EKyBqxPjJdjWsGD',
  'Рутина Лидеров People': 'https://cloud.akrussia.com/index.php/s/G8feRTyrAcDnQr9',
  'Календарь мероприятий': 'https://docs.google.com/spreadsheets/d/1wreWq3XErsRlOOODpYCOP2WrZL1EgbRNcKULkP7DmlQ/edit?hl=ru&gid=0#gid=0',
  'G&R': 'https://cloud.akrussia.com/index.php/f/1',
  // Добавьте свои ссылки здесь
};

const AugustPeople = () => {
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false); // Состояние для кнопки
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  const totalImages = Object.keys(images).length;
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setLoadedCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (loadedCount === totalImages) {
      setLoaded(true);
      setButtonVisible(true); // Показываем кнопку после загрузки всех изображений
    }
  }, [loadedCount, totalImages]);

  const handleBackClick = () => {
    navigate(-1); // Возвращает пользователя на предыдущую страницу
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="AugustPeople">
      {!loaded && (
        <div className="loader">
          <SyncLoader
            color="#fff"
            size={15}
            margin={5}
            aria-label="sync-loading"
          />
          <p className="loading-text">Грузимся...</p>
        </div>
      )}
      {Object.keys(images).map((key, index) => (
        <img
          key={index}
          className={`Page-img Page-img-${index + 1} ${loaded ? 'visible' : 'hidden'}`}
          src={images[key]}
          alt={`Лонгрид ${index + 1}`}
          onLoad={handleImageLoad}
        />
      ))}

      {/* Скрываем кнопку "Назад", если модальное окно открыто */}
      {buttonVisible && !isModalOpen && (
        <div className="button-container">
          <Link to='/sections'>
            <button className="back-button">Назад</button>
          </Link>
          <button className="modal-button" onClick={toggleModal}>
            Ссылки
          </button>
        </div>
      )}

      <ModalLinks isOpen={isModalOpen} onClose={toggleModal} links={links} />
    </div>
  );
};

export default AugustPeople;
