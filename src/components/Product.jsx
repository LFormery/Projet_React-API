import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

export default function Product(){

  const [barCode, setBarCode] = useState("")
  const [productInfo, setProductInfo] = useState(null)
  const [arrProducts, setArrProducts] = useState([])
  const [keywordTarget, setKeywordTarget] = useState("")

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(arrProducts))
    JSON.parse(localStorage.getItem("products"))
  },[arrProducts])

  useEffect(() => {
    let tmpRech = keywordTarget.toLowerCase();
    let productsList =JSON.parse(localStorage.getItem("products"))
    let res = productsList.find((element) => {
      return element.name.toLowerCase().includes(tmpRech);
    });
    //if(res) return displayCard(res)
    if(res) console.log(res)
  },[keywordTarget])

  useEffect(() => {
    let productExists = false

    arrProducts.forEach(product => {
          if (product.id == barCode){
            productExists = true
            setBarCode("")
            return
          } 
    });

    if (productExists) {
      console.log(barCode + "existe dans mon tableau")
      setBarCode("")
    } else {
      if(productInfo) {
        let newProduct = {
          id: productInfo.product.id,
          quantity: productInfo.product.quantity,
          name: productInfo.product.product_name_fr,
          brands: productInfo.product.brands,
          desc: productInfo.product.generic_name_fr,
          nutriGrade: productInfo.product.nutriscore_grade.toLowerCase(),
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
              <li className={element.nutriGrade==="a" ? "currentScore" : ""}>A</li>
              <li className={element.nutriGrade==="b" ? "currentScore" : ""}>B</li>
              <li className={element.nutriGrade==="c" ? "currentScore" : ""}>C</li>
              <li className={element.nutriGrade==="d" ? "currentScore" : ""}>D</li>
              <li className={element.nutriGrade==="e" ? "currentScore" : ""}>E</li>
            </ul>
          </div>
          <div className="card-footer">
            <small className="text-muted">{element.id}</small>
          </div>
          <a type="button" id="delete-btn" onClick={ ()=> deleteCard(this.parentNode, element.id)} className="btn btn-danger">Supprimer</a>
        </div>
      </div>
    )
  }
  
  function deleteCard(card, elementId) {
    let saved = JSON.parse(localStorage.getItem("products"))
    
    saved.forEach(function (items, i) {
      if (items.id == elementId) {
        saved.splice(i, 1);
      }
    });
    saved = JSON.stringify(saved);
    localStorage.setItem("products", saved);
    
  }

  return (
    <div className="container">
        <div className="input-group">
          <input type="search" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Rechercher ..."  />
          <button className="btn btn-outline-info" id="barCode-btn" onClick={search} type="submit"> Entrer code barre </button>
        </div>
        <div className="input-group mt-3">
          <input type="search" value={keywordTarget} onChange={(e)=>{setKeywordTarget(e.target.value)}} className="form-control" placeholder="Nom du produit"  />
        </div>
      <div className="row card-group d-flex justify-content-around mt-4">
        {cardProduct}
      </div>
    </div>
  )
}