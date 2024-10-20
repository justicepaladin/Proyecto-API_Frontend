import {AiFillStar} from "react-icons/ai";

import "./Products.css";

function Products() {
  return <>
    <section className="card-container">
      <section className="card">
        <img src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg" alt="Shoe"/>
        <div className="card-details">
          <h3 className="card-title">Shoe</h3>
          <section className="card-reviews">
            <AiFillStar/>
          </section>
        </div>
      </section>

    </section>


  </>
}

export default Products;