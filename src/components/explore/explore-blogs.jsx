import React, { Component } from "react";
import ExploreBlogCard from "./explore-blog-cards";


function ExploreBlogs(props) {

    const [items, updateItems] = React.useState([{}]);
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (props.name.length > 3 || props.name.length==0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("index", props.index);
            urlencoded.append("time", props.time);
            urlencoded.append("difficulty", props.difficulty);
            urlencoded.append("type", props.type);
            urlencoded.append("name", props.name.length==0?'NA':props.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()));

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
            };

            fetch("http://localhost:4000/explore", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (result != 'error') {
                        console.log(JSON.parse(result));
                        updateItems(JSON.parse(result));
                    } else {
                        updateItems([]);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }, [props.name, props.type, props.time, props.difficulty, props.index])

    function createBlogCards(item) {
        return <ExploreBlogCard
            key={item.id}
            title={item.name}
            time={item.time}
            comments={item.comments}
            likes={item.likes}
            difficulty={item.difficulty} 
            type={item.type }   
            />


    }
    return <div className="blogs-container" >
        <div className="row" >
            {items.map(createBlogCards)}
        </div>
    </div>
}

export default ExploreBlogs;