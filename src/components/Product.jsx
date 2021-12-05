import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

export default function Product(){


  const [barCode, setBarCode] = useState("")
  const [productInfo, setProductInfo] = useState(null)
  const [arrProducts, setArrProducts] = useState([])

  useEffect(() => {
    console.log("arrProducts est setté")
    localStorage.setItem("products", JSON.stringify(arrProducts))
    let saved = JSON.parse(localStorage.getItem("products"))
  },[arrProducts])

  useEffect(() => {
    let productExists = false

    arrProducts.forEach(product => {
          if (product.id == barCode){
            productExists = true
            return
          } 
    });
     if (productExists) {
       console.log(barCode + "existe dans mon tableau")
     } else {
       if(productInfo) {
        let newProduct = {
          id: productInfo.product.id,
          quantity: productInfo.product.quantity,
          name: productInfo.product.product_name_fr,
          brands: productInfo.product.brands,
          desc: productInfo.product.generic_name_fr,
          nutriGrade: productInfo.product.nutriscore_grade,
          nutriScore: productInfo.product.nutriscore_score,
          image: productInfo.product.image_url,
        }
        setArrProducts(arrProducts => [...arrProducts, newProduct])
       }
     }
}, [productInfo]);


  function search() {
    let url = 'https://fr.openfoodfacts.org/api/v0/product/' + barCode + '.json'
    axios.get(url).then(result => {
      if (result.status === 200) {
        setProductInfo(result.data)
      }
    }) 
  }


  
  return (
    <div>
      <div className="input-group mb-3">
        <input type="search" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Rechercher ..."  />
        <button className="btn btn-outline-info" onClick={search} type="button"> Rechercher </button>
      </div>
    </div>
  )
}