import React, { useEffect } from "react";
import { brandPageStyles } from "../assets/dummyStyles";
import { useParams } from "react-router";
import watchesData from "../assets/Categoriesdata";
import { useCart } from "../context/CartContext";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const BrandPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const brandWatches = watchesData[brandName?.toLowerCase()] || [];
  const { addToCart, cart, increment, decrement } = useCart();

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const findInCart = (id) => cart.find((product) => product.id === id);

  if (!brandWatches.length) {
    return (
      <div className={brandPageStyles.notFoundContainer}>
        <div className={brandPageStyles.notFoundCard}>
          <h2 className={brandPageStyles.notFoundTitle}>No watches found</h2>
          <p className={brandPageStyles.notFoundText}>This brand does not have any watches available on our site.</p>
          <button className={brandPageStyles.goBackButton} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={brandPageStyles.mainContainer}>
      <div className={brandPageStyles.innerContainer}>
        <div className={brandPageStyles.headerContainer}>
          <div className={brandPageStyles.backButtonContainer}>
            <button
              className={brandPageStyles.backButton}
              onClick={() => navigate(-1)}
            >
              <div className={brandPageStyles.backIconContainer}>
                <ArrowLeft size={20} />
              </div>
              <span className={brandPageStyles.backText}>Back</span>
            </button>
          </div>

          <div className={brandPageStyles.titleContainer}>
            <h1 className={brandPageStyles.title}>{brandName} Collections</h1>
          </div>
        </div>

        {/* Watch grid */}
        <div className={brandPageStyles.grid}>
          {brandWatches.map((watch) => {
            const inCart = findInCart(watch.id);
            return (
              <div key={watch.id} className={brandPageStyles.card}>
                <div className={brandPageStyles.imageContainer}>
                  <img src={watch.image} alt={watch.name} className={brandPageStyles.image} />
                </div>

                <div className={brandPageStyles.detailsContainer}>
                  <h2 className={brandPageStyles.watchName}>{watch.name}</h2>
                  <p className={brandPageStyles.watchDesc}>{watch.desc}</p>
                  <div className={brandPageStyles.priceAndControls}>
                    <p className={brandPageStyles.price}>{watch.price}</p>
                    {inCart ? (
                      <div className={brandPageStyles.quantityContainer}>
                        <button className={brandPageStyles.quantityButton} onClick={() => decrement(watch.id)} >
                          <Minus size={16} />
                        </button>
                        <div className={brandPageStyles.quantityCount}>
                          {inCart.quantity}
                        </div>
                        <button className={brandPageStyles.quantityButton} onClick={() => increment(watch.id)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className={brandPageStyles.addButton}
                        onClick={() => {
                          addToCart({
                            id: watch.id,
                            name: watch.name,
                            price: watch.price,
                            image: watch.image,
                          });
                        }}
                      >
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
