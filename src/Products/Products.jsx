import {AiFillStar} from "react-icons/ai";
import { IoBagAddSharp } from "react-icons/io5";

import "./Products.css";

function Products() {
  return <>
    <section className="card-container">
      <section className="card">
        <img src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg"
             alt="Shoe"
             className="card-img"/>
        <div className="card-details">
          <h3 className="card-title">Zapatilla</h3>
          <section className="card-reviews">
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <span className="total-reviews"> 4</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>$300</del>
              $200
            </div>
            <div className="bag">
              <IoBagAddSharp className="bag-icon"/>
            </div>
          </section>
        </div>
      </section>

      <section className="card">
        <img src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg"
             alt="Shoe"
             className="card-img"/>
        <div className="card-details">
          <h3 className="card-title">Zapatilla</h3>
          <section className="card-reviews">
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <span className="total-reviews"> 4</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>$300</del>
              $200
            </div>
            <div className="bag">
              <IoBagAddSharp className="bag-icon"/>
            </div>
          </section>
        </div>
      </section>

      <section className="card">
        <img src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg"
             alt="Shoe"
             className="card-img"/>
        <div className="card-details">
          <h3 className="card-title">Zapatilla</h3>
          <section className="card-reviews">
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <span className="total-reviews"> 4</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>$300</del>
              $200
            </div>
            <div className="bag">
              <IoBagAddSharp className="bag-icon"/>
            </div>
          </section>
        </div>
      </section>

      <section className="card">
        <img src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg"
             alt="Shoe"
             className="card-img"/>
        <div className="card-details">
          <h3 className="card-title">Zapatilla</h3>
          <section className="card-reviews">
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <AiFillStar className="ratings-star"/>
            <span className="total-reviews"> 4</span>
          </section>
          <section className="card-price">
            <div className="price"> $200
            </div>
            <div className="bag">
              <IoBagAddSharp className="bag-icon"/>
            </div>
          </section>
        </div>
      </section>

    </section>


  </>
}

export default Products;