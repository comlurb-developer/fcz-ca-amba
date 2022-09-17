import React from "react";
import axios from 'axios';


const LEN = 1105;


const Cacambas = () => {

    return axios.get('https://us-central1-fcz-munck.cloudfunctions.net/app')

}

export { Cacambas }