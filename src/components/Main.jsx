import { useState,useEffect } from "react"
export default function Main() {
    const memeObj={
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    }
    const [meme,setMeme]=useState(memeObj)
    const [allMemes,setAllMemes]=useState([])
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json())
            .then(memes=>setAllMemes(memes.data.memes))
    },[])
    // console.log(allMemes)

    function handleChange(event){
        const {value,name}= event.currentTarget;
        setMeme(prevMeme=>({...prevMeme,[name]:value}))
    }

    function imageGenerate(){
        const random=Math.floor(Math.random() * allMemes.length)
        setMeme(prev => ({...prev,imageUrl:allMemes[random].url}))
    }
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={imageGenerate}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}