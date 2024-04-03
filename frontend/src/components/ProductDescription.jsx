import React from "react";

const ProductDescription = () => {
  return (
    <div className="mt-20">
      <div className="flex gap-3 mb-4">
        <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ">
          Description
        </button>
        <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36 ">
          Care Guide
        </button>
        <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36 ">
          Size Guide
        </button>
      </div>
      <div className="flex flex-col pb-16 ">
        <p className="text-sm text-slate-900/100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          necessitatibus omnis praesentium tempora doloremque hic ullam suscipit
          unde! Itaque id quae perspiciatis dolorem minus asperiores tempora
          dolores similique voluptas quod natus earum, expedita perferendis
          mollitia quia accusantium assumenda amet? Aliquid sequi harum odio
          mollitia architecto nam modi labore tempora, veniam ducimus? Qui animi
          hic libero.
        </p>
        <p className="text-sm text-slate-900/100">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae quam,
          quidem optio tempora illo consequuntur voluptate quisquam
          exercitationem consectetur iste molestias recusandae fuga ipsam esse.
          Maiores, voluptates atque!
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
