import React, { Fragment, useState } from 'react'
import './infoBar.css'
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from 'react-redux'
import { filterBasedOnClothType, filterBasedOnClothSize, filterBasedOnSearchValue } from '../../redux/actions/action';
let timer;

export default function infoBar() {
    const dispatch = useDispatch();
    const productIds = useSelector(state => state.productIds);

    const [clothType, setClothType] = useState('all')
    const [clothSize, setClothSize] = useState('all')
    const [searchData, setSearchData] = useState('')

    const handleClothTypeOnChange = (event) => {
        event.preventDefault();
        setClothType(event.target.value)
        dispatch(filterBasedOnClothType(event.target.value))
    }

    const handleClothSizeOnChange = (event) => {
        event.preventDefault();
        setClothSize(event.target.value)
        dispatch(filterBasedOnClothSize(event.target.value, clothType))
    }

    const handleReset = (event) => {
        event.preventDefault();
        setClothSize('all')
        setClothType('all')
        dispatch(filterBasedOnClothType('all'))
        dispatch(filterBasedOnClothSize('all', clothType))
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchData(event.target.value)
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(filterBasedOnSearchValue(event.target.value, clothType))
        }, 2000);
    }

    const handleCartSubmit = (event) => {
        event.preventDefault();
        console.log(productIds)
    }

    return (
        <Fragment>
            <div className='infoBarContainer'>
                {/* group 1 */}
                <div className='groupOneDiv'>
                    {/* cloth type drop down */}
                    <div className='dropDownDiv1'>
                        <select name="product_table_length" value={clothType} onChange={handleClothTypeOnChange} className="form-select" aria-label="Default select example">
                            <option value="all" defaultValue>All</option>
                            <option value="tshirt">tshirt</option>
                            <option value="hoodie">hoodie</option>
                        </select>
                    </div>
                    {/* cloth size drop down */}
                    <div className='dropDownDiv2'>
                        <select name="product_table_length" value={clothSize} onChange={handleClothSizeOnChange} className="form-select" aria-label="Default select example">
                            <option value="all" defaultValue>Size</option>
                            <option value="m">m</option>
                            <option value="l">l</option>
                            <option value="xl">xl</option>
                            <option value="xxl">xxl</option>
                            <option value="xxxl">xxxl</option>
                        </select>
                    </div>
                    {/* reset button */}
                    <div className='resetDiv' onClick={handleReset}>
                        <ReplayIcon className='resetIcon' /><span className='resetSpan'>Reset</span>
                    </div>
                </div>
                {/* group2 */}
                <div className='groupTwoDiv'>
                    <div className="d-flex">
                        <div><input className="form-control me-2" type="search" placeholder="Search" value={searchData} onChange={handleSearch} aria-label="Search" /></div>
                        <div className='addToCartDiv'><button className="btn btn-primary" onClick={handleCartSubmit}>Add To Cart</button></div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}
