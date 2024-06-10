
const urlImg = "http://10.92.198.38:8080/";
const limitPost = 10;
var currentPage = 1;

async function getPersons(currentPage) {
    const response = await fetch(
        `http://10.92.198.38:8080/feed/posts?page=${currentPage}&&perPage=10`
    );
    const posts = await response.json();
    console.log(posts);
    return posts;
}


fetch(`http://10.92.198.38:8080/feed/posts?page=${currentPage}`)
    .then((response) => response.json())
    .then((data) => cards(data));


function cards(data) {
    console.log(data);

    
    const arrayDatas = data.posts;

  
    const feed = document.querySelector(".cardContainer");

    
    arrayDatas.forEach((element) => {
        const post = document.createElement("div");
        post.className = "card";

        
        post.innerHTML = `
            <img src="${urlImg + element.imageUrl}">
            <div>
              <h1>${element.title}</h1>
              <p>${element.content}</p>
            </div>
        `;

        feed.appendChild(post);
    });
}


async function loadPage(page) {
    const data = await getPersons(page);

    
    if (data.posts.length === 0) {
        alert("Não há mais cards para ler");
        document.getElementById("btnLoadMore").disabled = true;
        return;
    }

    cards(data);
}


document.getElementById("btnLoadMore").addEventListener("click", () => {
    currentPage++;
    loadPage(currentPage);
});
