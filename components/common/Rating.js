import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({ value = 0 }) => {
    const [rating, setRating] = useState(value);

    const handleMouseEnter = (index) => {
        setRating(index + 1);
    };

    const handleMouseLeave = () => {
        setRating(0);
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    return (
        <div className="flex items-center my-2">
            {[...Array(5)].map((_, index) => {
                const filled = index < rating;
                return (
                    <div
                        key={index}
                        className="mr-1 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleStarClick(index)}
                    >
                        {filled ? (
                            <FaStar className="text-yellow-500" />
                        ) : (
                            <FaRegStar className="text-gray-500" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Rating;
