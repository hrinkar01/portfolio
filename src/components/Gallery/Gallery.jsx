import React,{useState} from 'react';
import Masonary, {ResponsiveMasonry} from "react-responsive-masonry";

const images = [
    "https://www.pixelstalk.net/wp-content/uploads/2016/06/Night-Sky-Backgrounds.jpg",
    "https://wallpaperaccess.com/full/1217335.jpg",
    "https://wallpapercave.com/wp/wp4541304.jpg",
    "https://wallpaperaccess.com/full/308432.jpg",
    "https://wallpapercave.com/wp/wp4541304.jpg",
    "https://img.freepik.com/premium-photo/purple-sky-background-with-abstract-violet-design_124507-13639.jpg"

]
const Gallery = () => {
    const [data, setData] = useState({img: '', i: 0})
    const viewImage = (img ,i) => {
        setData({img, i})
    }
    return (
        <>
            {data.img && 
                <div style={{
                    width: '100%',
                    height: '100vh', 
                    background: 'black',
                    position: 'fixed',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}>
                
                    <img src={data.img} style={{width: 'auto', maxWidth: '90%', maxHeight: '90%'}} />
                </div>    
            }
            <div style={{padding: '10px'}} id='gallery'>
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonary gutter="20px">
                        {images.map((image, i) => (
                            <img 
                                key={i}
                                src={image}
                                style={{width: "100%", display: "block", cursor: "pointer"}}
                                alt=""
                                onClick={() => viewImage(image, i)}
                            />    
                        ))}
                    </Masonary>
                </ResponsiveMasonry>    
            </div>  
        </>      
    );
};

export default Gallery;
