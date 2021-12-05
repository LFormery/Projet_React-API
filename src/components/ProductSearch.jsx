import {useState, useEffect} from 'react';
import axios from 'axios';


export default function ProductSearch(){

  const [productInfo, setProductInfo] = useState(null)
  const [barCode, setBarCode] = useState(7622210137258)
  const [products, setProducts] = useState([]);



  // debug from https://www.robinwieruch.de/react-hooks-fetch-data/

  // useEffect(async () => {
  //   console.log(barCode)
  //   if(!barCode){
  //     console.log("pas trouvé")
  //   } else {
  //     let url = 'https://world.openfoodfacts.org/api/v0/product/' + barCode + '.json'
  //     const result = await axios(url);
  //     if(result.status === 200) setProductInfo(result.data);
  //   }
  // }, []);

  useEffect(() => {
      let url = 'https://fr.openfoodfacts.org/api/v0/product/' + barCode + '.json'
      setProductInfo(null)
      const result = axios.get(url);
      if(result.status === 200) {
        let promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve (result.data);
          }, 500);  
        })
        promise.then((value) => {
          console.log("fin promesse")
          setProductInfo(value)
          console.log(productInfo)
        })
      }
      setArrayLocal()
  })



  function search() {
    // let url = 'https://fr.openfoodfacts.org/api/v0/product/' + barCode + '.json'
    // setProductInfo(null)
    // const result = axios.get(url);
    // if(result.status === 200) {
    //   let promise = new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve (result.data);
    //     }, 500);  
    //   })
    //   promise.then((value) => {
    //     console.log("fin promesse")
    //     setProductInfo(value)
    //     console.log(productInfo)
    //   })
    // }
    // setArrayLocal()
  }


  // console.log(displayProduct)

  console.log(products)

  let isExist = false

  products.forEach(product => {
        if (product.id == barCode){
          isExist = true
          return
        } 
  });

  function setArrayLocal() {
    if (productInfo){

      if (isExist){
        //console.log(products)
        console.log("⚠️ Existe déja dans products ⚠️");
      } else {
        console.log(isExist)

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

        //console.log(newProduct)
        let saved = JSON.parse(localStorage.getItem("products"))
        //console.log(localStorage.getItem(barCode))
        
 
        //console.log(products)
        setProducts(product => [...products, newProduct])

        let connerie = localStorage.setItem("products", JSON.stringify(products))

  
        return (
          <div>
            <div className="card" id={productInfo.product.id}>
              <img src={productInfo.product.image_url} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h4 className="card-title fw-bold">{productInfo.product.product_name_fr}</h4>
                <p className="card-text text-secondary">{productInfo.product.id}</p>
                <p className="card-text">{productInfo.product.generic_name_fr}</p>
              </div>
    
              <div className="card-body">
                <p className="card-text text-secondary">{productInfo.product.quantity}</p>
                <ul className="nutriscore">
                  <li className="(this.props.showBulkActions ? 'show' : 'hidden'">A</li>
                  <li className="">B</li>
                  <li className="">C</li>
                  <li className="">D</li>
                  <li className="currentScore">E</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div>
      <div className="input-group mb-3">
        <input type="search" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Rechercher ..."  />
        <button className="btn btn-outline-info" onClick={search} type="button"> Rechercher </button>
      </div>
    </div>
  )


  //3068320080000
  //7622210137258
  //5900396031198

  




}