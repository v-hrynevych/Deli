import {useSelector} from "react-redux";
import {wishListValue} from "src/store/wishListSlice";
import {ProductCard} from "../ProductCard";

export const WishList = () => {
    const {wishList} = useSelector(wishListValue);
    return (
        <>
            {wishList
                ? wishList.map((item) => {
                      return (
                          <ProductCard
                              name={item.name}
                              productOwner={item.productOwner}
                              category={item.category}
                              location={item.location}
                              data={item.data}
                              description={item.description}
                              email={item.email}
                              productId={item.productId}
                              href={item.href}
                              key={item.productId}
                              photoUrl={item.photoUrl}
                              title={item.title}
                              stars={item.stars}
                              price={item.price}
                              oldPrice={item.oldPrice}
                              quantity={item.quantity}
                              quantityComments={item.quantityComments}
                              tel={item.tel}
                          />
                      );
                  })
                : null}
        </>
    );
};
