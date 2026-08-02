import React, { useMemo } from "react";
import { watchPageStyles } from "../assets/dummyStyles";
import { WATCHES, FILTERS as RAW_FILTERS } from "../assets/dummywdata";
import { useCart } from "../context/CartContext";
import { Grid, User, Users, Icon, ShoppingCart, Minus, Plus } from "lucide-react";

const ICON_MAP = { Grid, User, Users };
const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
  : [
      { key: "all", label: "All", icon: Grid },
      { key: "men", label: "Men", icon: User },
      { key: "women", label: "Women", icon: Users },
    ];

const WatchPage = () => {
  const [filter, setFilter] = React.useState("all");
  const { cart, addToCart, increment, decrement, removeFromCart } = useCart();

  // Filter watches based on the selected filter
  const filteredWatches = useMemo(() => {
    return WATCHES.filter((watch) =>
      filter === "all" ? true : watch.gender === filter,
    );
  }, [filter]);

  // Get the quantity of a specific watch in the cart
  const getQuantity = (watchId) => {
    const item = cart.find(
      (cartItem) => String(cartItem.id) === String(watchId),
    );
    return item ? Number(item.quantity || 0) : 0;
  };

  return (
    <div className={watchPageStyles.container}>
      <div className={watchPageStyles.headerContainer}>
        <div>
          <h1 className={watchPageStyles.headerTitle}>
            Timepieces{" "}
            <span className={watchPageStyles.titleAccent}>Curated</span>
          </h1>
          <p className={watchPageStyles.headerDescription}>
            A handpicked selection - clean presentation, zero borders. Choose a
            filter to refine.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={watchPageStyles.filterContainer}>
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`${watchPageStyles.filterButtonBase} ${
                  active
                    ? watchPageStyles.filterButtonActive
                    : watchPageStyles.filterButtonInactive
                }`}
              >
                <Icon className={watchPageStyles.filterIcon} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={watchPageStyles.grid}>
        {filteredWatches.map((watch) => {
          const watchId = String( watch.id ?? watch._id ?? watch.sku ?? watch.name ); // for future MERN compatibility
          const quantity = getQuantity(watchId);

          return (
            <div key={watchId} className={watchPageStyles.card}>
              <div className={watchPageStyles.imageContainer}>
                <img src={watch.img} alt={watch.name} className={watchPageStyles.image} draggable={false} />

                <div className={watchPageStyles.cartControlsContainer}>
                  {quantity > 0 ? (
                    <div className={watchPageStyles.cartQuantityControls}>
                      <button
                        onClick={() => {
                          if (quantity > 1) decrement(watchId);
                          else removeFromCart(watchId); 
                        }}
                        className={watchPageStyles.cartButton}
                      >
                        <Minus className={watchPageStyles.filterIcon} />
                      </button>

                      <div className={watchPageStyles.cartQuantity}> {quantity} </div>

                      <button
                        onClick={() => increment(watchId)}
                        className={watchPageStyles.cartButton}
                      >
                        <Plus className={watchPageStyles.filterIcon} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart({ id: watchId, name: watch.name, price: watch.price, img: watch.img })}
                      className={watchPageStyles.addToCartButton}
                    >
                      <ShoppingCart className={watchPageStyles.addToCartIcon} />
                      Add
                    </button>
                  )}
                </div>
              </div>

              <div className={watchPageStyles.productInfo}>
                <h3 className={watchPageStyles.productName}>{watch.name}</h3>
                <p className={watchPageStyles.productDescription}>{watch.desc}</p>
                <p className={watchPageStyles.productPrice}>{watch.price}</p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchPage;
