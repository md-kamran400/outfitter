import React, { useEffect, useState } from "react";
import Item from "./Item";
import LATEST from "../assets/latest";

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("https://outfitter-backend-sosb.onrender.com/newcollections")
      .then((res) => res.json())
      .then((data) => setNew_collection(data));
  }, []);
  return (
    <section className="bg-primary">
      <div className="max_padd_container py-12 xl:py-28 xl:w-[88%]">
        <h3 className="h3 text-center">Latest Products</h3>
        <hr className="h-[3px] w-full md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-black to-transparent mb-16" />

        {/* container */}

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {new_collection.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
