
    const btnLoadMore = document.getElementById("btnLoadMore");
    const cardContainer = document.getElementById("image");

    let currentPage = 0; 
    const cardsPerPage = 10;
  
    btnLoadMore.addEventListener("click", function (e) {
      e.preventDefault();
      
      fetch(`http://10.92.198.38:8080/feed/get?page=${currentPage}&limit=${cardsPerPage}`, {
        method: "GET",
        headers: {
          
        },
      })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        const posts =  data.posts;
        if (posts.length === 0) {
          alert("No more cards to load");
          btnLoadMore.disabled = true;
          return;
        }
  
        
        posts.forEach(card => {
          const cardElement = document.createElement("div");
          cardElement.className=("card")
          cardElement.classList.add("card");

        const imageElement = document.createElement("img");
          imageElement.src = card.image;
          cardElement.appendChild(imageElement);

          const titleElement = document.createElement("h1");
          titleElement.textContent = card.title; 
          cardElement.appendChild(titleElement);
  
          const contentElement = document.createElement("p");
          contentElement.textContent = card.content;
          cardElement.appendChild(contentElement);
  
          
  
          cardContainer.appendChild(cardElement);
        });
  
        currentPage++; 
      })
      .catch((err) => console.log(err));
    });
  
  