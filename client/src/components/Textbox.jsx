import {useEffect, useState} from 'react';



function Textbox (){
    const [items, setItems] = useState([]);

        useEffect(() =>{
            fetch(`../server/src/routes/index.ts`)
                .then((response) => {
                    if(!response.ok){
                        throw new Error(`Error ${response.status}`)
                    }
                    return response.json();
                })
                .then(data) => setItems(data.results || [])
                .catch((error) => console.log('Error fetching data', error))
        },[]);
        return (
        <>
            <input type="text" value="query" />
        </>
    )
}