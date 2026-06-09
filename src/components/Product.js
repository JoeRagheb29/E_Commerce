import { Link } from "react-router";
import { useState } from "react";
import "./product.css";

function Product({ myObj, showButton, children }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rating = myObj.rating ? Math.round(myObj.rating * 10) / 10 : 4.5;
  const reviews = Math.floor(Math.random() * 500) + 10;
  const stock = myObj.stock || Math.floor(Math.random() * 50) + 1;
  const isLowStock = stock < 5;
  const discount = myObj.discountPercentage || 0;

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className="star"
          style={{ opacity: i < Math.floor(rate) ? 1 : 0.3 }}
        >
          ⭐
        </span>,
      );
    }
    return stars;
  };

  return (
    <div
      className={`card p-3 ${showButton ? "hoover h-600 shadow" : "container flex-lg-row flex-md-column mt-4 gap-3"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div
        className={`h-50 ${
          showButton
            ? "product-image-wrapper"
            : "col-md-12 col-lg-6 productShadow bg-black-50 d-flex flex-column rounded-3 gap-4 align-items-center"
        }`}
      >
        {showButton && (
          <>
            {/* Discount Badge */}
            {discount > 0 && (
              <span className="discount-badge">-{Math.round(discount)}%</span>
            )}

            {/* Stock Badge */}
            {stock > 0 && (
              <span className={`stock-badge ${isLowStock ? "low-stock" : ""}`}>
                {isLowStock ? `Only ${stock} left!` : "In Stock"}
              </span>
            )}

            {/* Wishlist Button */}
            <button
              className={`wishlist-btn-card ${isWishlisted ? "wishlisted" : ""}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </>
        )}

        <img
          src={myObj.images[0]}
          className={`w-100 ${showButton ? "h-100" : ""}`}
          alt={myObj.title}
        />

        {!showButton && <h5>Price = {myObj.price}$</h5>}
      </div>

      {/* Product Info Section */}
      <div
        className={`card-body d-flex flex-column align-center ${
          showButton ? "" : "col-md-12 col-lg-6 justify-content-start"
        }`}
      >
        {showButton ? (
          <>
            {/* Title */}
            <h5 className="card-title">{myObj.title}</h5>

            {/* Rating */}
            <div className="rating-section">
              <div className="stars-container">{renderStars(rating)}</div>
              <span className="rating-text">
                <strong>{rating}</strong> ({reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="card-text">{myObj.description}</p>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-display">
                ${myObj.price}
                {discount > 0 && (
                  <span className="price-original">
                    ${(myObj.price / (1 - discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="card-title">{myObj.title}</h2>
            <h5 className="card-text">{myObj.description}</h5>
          </>
        )}

        {children}

        {showButton && (
          <Link
            className="btn btn-primary-custom w-100"
            to={`/ProductDetails/${myObj.id}`}
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default Product;
