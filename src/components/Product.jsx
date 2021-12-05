import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

export default function Product(){


  const [barCode, setBarCode] = useState("")
  const [productInfo, setProductInfo] = useState({})
  const [arrProducts, setArrProducts] = useState(
    [
      {
      id: 3068320080000,
      name: "Evian"
    },
    {
      id: 7622210137258,
      name: "Oreo"
    },
    {
      id: 5900396031198,
      name: "Tea Time"
    }
  ])

  useEffect(() => {
    console.log("useeffect youhouuu")
}, [productInfo]);
  //console.log(arrProducts)

  function search() {
    let url = 'https://fr.openfoodfacts.org/api/v0/product/' + barCode + '.json'
    axios.get(url).then(result => {
      if (result.status === 200) {
        setProductInfo(result.data)
      }
    }) 
  }
  console.log(productInfo)
  
  return (
    <div>
      <div className="input-group mb-3">
        <input type="number" value={barCode} onChange={(e)=>{setBarCode(e.target.value)}} className="form-control" placeholder="Rechercher ..."  />
        <button className="btn btn-outline-info" onClick={search} type="button"> Rechercher </button>
      </div>
    </div>
  )
}