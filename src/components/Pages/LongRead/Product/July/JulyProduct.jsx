import React, { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import '../../LongRead.css';
import { Link, useNavigate } from "react-router-dom";

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../../../../assets/PRODUCT/July', false, /\.(jpg|jpeg|png)$/));

const JulyProduct = () => {
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false); // Добавлено состояние для кнопки

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

  return (
    <div className="JulyProduct">
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

      {buttonVisible && (
        <Link to='/sections'>
        <button className="back-button">
          Назад
        </button>
        </Link>
      )}
    </div>
  );
};

export default JulyProduct;
