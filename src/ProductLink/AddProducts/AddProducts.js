import React, { useState, useEffect } from "react";
import BannerImage from "../BannerImage.js";
import Products from "../Products.js";
import Loading from "../../Components/Loading";
import axios from "axios";

function AddProducts() {
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/product/cat/1")
      .then((e) => {
        var AdditionalProducts = [];

        console.log("AdditionalProducts");
        AdditionalProducts = e.data.map((i) => (
          <Products
            key={i._id}
            productImg={i.imageUrl}
            heading={i.title}
            price={i.price}
            rating={i.rating}
            id={i._id}
          />
        ));
        setproductList(AdditionalProducts);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="homeProductsContainer">
      <BannerImage
        image="https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2020/HOLIDAY/BrowsePages2/desktop/L0/FGG-hero-3.jpg"
        backcolor="#1c3f21"
      />

      {loading ? <Loading /> : productList}
    </div>
  );
}

export default AddProducts;
