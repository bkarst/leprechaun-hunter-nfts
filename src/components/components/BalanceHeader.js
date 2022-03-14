import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

const BalanceHeader = (props) => {
    const balance = useSelector(appState => appState.mainReducer.balance)
    return (
        <div style={{paddingLeft: 20, paddingRight: 20, height: 40, background: 'rgba(0,0,0,0.5)', borderRadius: 100, margin: 20, marginRight: 30, display: 'flex', flexDirection: 'row'}}>
            
            <img src={"./img/common_chest.PNG"} style={{width: 30, height: 30}}/>
                
            <div style={{margin: 4, color: '#fff'}} >
                Gold: {balance}
            </div>
            
        </div>
    )
}

export default BalanceHeader