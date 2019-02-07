import React, { Component } from 'react';

export const Button = function ( {symbol, click} ) {
    return <button 
        onClick={() => click(symbol)}>        
        {symbol}
    </button>
}