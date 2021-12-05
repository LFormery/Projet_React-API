import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

export default function Product(){


  const [barCode, setBarCode] = useState("")
  const [productInfo, setProductInfo] = useState(null)
  const [arrProducts, setArrProducts] = useState([])
  const [keywordTarget, setKeywordTarget] = useState("")

  useEffect(() => {
    console.log("arrProducts est setté")
    localStorage.setItem("products", JSON.stringify(arrProducts))
    let saved = JSON.parse(localStorage.getItem("products"))
  },[arrProducts])

  useEffect(() => {
    let tmpRech = keywordTarget.toLowerCase();
    let productsList =JSON.parse(localStorage.getItem("products"))
    let res = productsList.find((element) => {
      return element.name.toLowerCase().includes(tmpRech);
    });
    if(res) return displayCard(res)
  },[keywordTarget])

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
        return setProductInfo(result.data)
      }
    }) 
  }

  let cardProduct = arrProducts.map((product)=> {
    return displayCard(product)
  })

  function displayCard(element) {
    return (
      <div className="col-sm-3">
      <div className="card" id={element.id}>
            <img src={element.image} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h4 className="card-title fw-bold">{element.name}</h4>
              <p className="card-text text-secondary">{element.quantity}</p>
              <h6 className="card-text">{element.brands}</h6>
              <p className="card-text">{element.desc}</p>

              <ul className="nutriscore">
                <li className="(this.props.showBulkActions ? 'show' : 'hidden'">A</li>
                <li className="">B</li>
                <li className="">C</li>
                <li className="">D</li>
                <li className="currentScore">E</li>
              </ul>
            </div>
            <div class="card-footer">
              <small class="text-muted">{element.id}</small>
            </div>
          </div>
    </div>
    )
  }
  
  return (
    <div className="container">
      <div className="form-row justify-content-start">
        <div className="form-group col-sm-8">
          <div className="input-group">
            <input type="search" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Rechercher ..."  />
            <button className="btn btn-outline-info" onClick={search} type="button"> Entrer code barre </button>
          </div>
        </div>
        <div className="form-group col-sm-2">
          <div className="input-group">
            <input type="search" value={keywordTarget} onChange={(e)=>{setKeywordTarget(e.target.value)}} className="form-control" placeholder="Mot-clés"  />
          </div>
        </div>
      </div>
      <div className="row card-group d-flex justify-content-around">
        {cardProduct}
      </div>
    </div>
  )
}