import {faForward} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import Image from "next/image";
import styles from "./ImgSlider.module.scss";
import classNames from "classnames";

interface ImgSliderProps {
    imgArr: string[];
    alt: string;
}
export const ImgSlider = ({alt, imgArr = []}: ImgSliderProps) => {
    const [current, setCurrent] = useState(0);
    const length = imgArr.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(imgArr) || imgArr.length <= 0) {
        return null;
    }
    const slideClass = classNames(styles.active, styles.slide);
    return (
        <section className={styles.slider}>
            <FontAwesomeIcon
                className={styles.leftArrow}
                icon={faForward}
                onClick={prevSlide}
            />
            <FontAwesomeIcon
                className={styles.rightArrow}
                icon={faForward}
                onClick={nextSlide}
            />
            {imgArr.map((slide, index) => {
                return (
                    <div
                        className={
                            index === current ? slideClass : styles.slide
                        }
                        key={index}
                    >
                        {index === current && (
                            <Image
                                src={slide}
                                height="500px"
                                width="350px"
                                alt={alt}
                                className={styles.image}
                            />
                        )}
                    </div>
                );
            })}
        </section>
    );
};
