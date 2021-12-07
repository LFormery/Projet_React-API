import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

export default function Product(){

  const [barCode, setBarCode] = useState("")
  const [productInfo, setProductInfo] = useState(null)
  const [arrProducts, setArrProducts] = useState([])
  const [keywordTarget, setKeywordTarget] = useState("")

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(arrProducts))
    console.log(arrProducts)
    //JSON.parse(localStorage.getItem("products"))
  },[arrProducts])

  useEffect(() => {
    let tmpRech = keywordTarget.toLowerCase();
    let productsList =JSON.parse(localStorage.getItem("products"))
    let res = productsList.filter((element) => {
      const name = element.name.toLowerCase();
      const brands = element.brands.toLowerCase();
      const desc = element.desc.toLowerCase();

      if (name.indexOf(tmpRech) > -1) return element;
      if (brands.indexOf(tmpRech) > -1) return element;
      if (desc.indexOf(tmpRech) > -1) return element;

    });
    console.log(res)
    return displayCard(res)
  },[keywordTarget])

  useEffect(() => {
    let productExists = undefined
    arrProducts.forEach(product => {
          if (product.id == barCode){
            productExists = true
            setBarCode("")
            return
          } 
    });
    if (!productExists) {
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
        setBarCode("")
      } else {
        alert("Le produit "+ barCode + " existe déjà dans ma liste")
        setBarCode("")
        return
      }
    }
  }, [productInfo]);

  function search() {
    if(!barCode) return alert("Entrez un EAN")
    let url = 'https://fr.openfoodfacts.org/api/v0/product/' + barCode + '.json'
    axios.get(url).then(result => {
      if (result.status === 200) {
        return setProductInfo(result.data)
      } else {
        alert("Produit introuvable, vérifier l'EAN")
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
          <img src={element.image} className="card-img-top p-5" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title fw-bold">{element.name}</h5>
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
          <a type="button" id="delete-btn" key={element} onClick={ ()=> deleteCard(element)} className="btn btn-danger">Supprimer</a>
        </div>
      </div>
    )
  }
  
  function deleteCard(element) {
    let tmp = [...arrProducts];
    const indice = arrProducts.indexOf(element);
    if(indice > -1) tmp.splice(indice,1);
    setArrProducts(tmp); 
  }

  return (
    <div className="container">
        <div className="input-group">
          <input type="search" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Entrer EAN ..."  />
          <button className="btn btn-outline-info" id="barCode-btn" onClick={search} type="submit">Rechercher</button>
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