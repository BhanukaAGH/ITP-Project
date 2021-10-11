import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";


const StarRating = () =>{
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    return (
        <div>
            <h1>Put Your Feedback here 💬✔✔  </h1>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <lable>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}

                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={100}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />


                    </lable>
                );
            })}
            <br/>
            <p1 >you have given  {rating} star rating.</p1>
        </div>
    );
};
export default StarRating;
