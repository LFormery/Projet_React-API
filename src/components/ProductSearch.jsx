import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ProductSearch(){
  const [productInfo, setProductInfo] = useState({});

  // https://www.robinwieruch.de/react-hooks-fetch-data/

  useEffect(async () => {
    const result = await axios(
      'https://world.openfoodfacts.org/api/v0/product/7622210137258.json',
    );
    if(result.status === 200) setProductInfo(result.data);
  }, []);

  console.log(productInfo)

  if (!productInfo.status) {
    return (
      <div>Bien essayé fdp </div>
    )
  }
  return(
    <div>
      <p>{productInfo.product.id}</p>
      <p>{productInfo.product.product_name_fr}</p>
      <p>{productInfo.product.generic_name_fr}</p>
      <p>{productInfo.product.quantity}</p>
      <p>{productInfo.product.brands}</p>
      {/* <p>{productInfo.product.nutriscore_grade}</p> */}
      <p>{productInfo.product.nutriscore_score}</p>
      <img src={productInfo.product.image_url} alt="" />
      <img src={productInfo.product.image_thumb_url} alt="" />
      <img src={productInfo.product.image_small_url} alt="" />
    </div>
  )
  




}