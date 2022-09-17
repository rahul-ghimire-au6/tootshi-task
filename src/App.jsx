import { Fragment, useEffect, useState } from 'react'
import './App.css'
import InfoBar from './component/infoBar/infoBar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { fetchClothData, storeProductIds } from './redux/actions/action'
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const clothData = useSelector(state => state.clothData);
  let [productId, setProductId] = useState([]);

  useEffect(() => {
    dispatch(fetchClothData())
    //normally we use fetch/axios here to get the data from api 
  }, [])

  const handleCheckBox = (event) => {
    let temp = productId;
    if (event.target.checked) {
      
      temp.push(event.target.id)
    } else {
      let filteredData = temp.filter(element => element !== event.target.id)
      temp = filteredData
    }
    setProductId(temp);
    dispatch(storeProductIds(temp));
  }

  const handleQuantity = (event)=>{
    event.prevent.default();


  }



  return (
    <Fragment>
      <div className='rootContainer'>
        {/* start of the top infobar here */}
        <div className='topBarContainer'>
          <InfoBar />
        </div>
        {/* displaying/listing item over here in table */}
        <div className='tableContainer'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Color</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col"><center>Buy</center></th>
              </tr>
            </thead>
            {/* <tbody> */}
            {clothData.map(element => <tbody key={element.id}>
              <tr>
                <th><img className='imgClass' src={element.image} alt="cloth image" /></th>
                <th><b>{element.name}</b></th>
                <th><b>{element.color}</b></th>
                <th>{element.stock === 0 ? <div><MoodBadIcon className='outofStockIcon' /><span className='outofStockText'>Out Of Stock</span></div> : <div><EmojiEmotionsIcon className='inStockIcon' /><span className='inStockText'>In Stock</span></div>}</th>
                <th><b>&#8377;{element.price}</b></th>
                <th>
                  <div className='buyRootDiv'>
                    <div className='buyInputNumber'>
                      <input id={element.id} name='quantity' type="number" onChange={handleQuantity} />
                    </div>
                    {/* icon */}
                    <div className='buyIconDiv'>
                      <ShoppingCartOutlinedIcon style={{ fontSize: '1.25em' }} className='buyIcon' />
                    </div>
                    {/* checkbox */}
                    <div id={element.id}><input id={element.id} onChange={handleCheckBox} type='checkbox' /></div>
                  </div></th>
              </tr>

            </tbody>)}
            {/* </tbody> */}
          </table>
        </div>
        {/* start of the Bottom infobar here */}
        {/* <div><InfoBar /></div> */}

      </div>
    </Fragment>
  )
}


export default App
