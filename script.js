const database = firebase.database().ref();
const blogListContainer = document.getElementById("blog-list");
const writeBlogContainer = document.getElementById("write-blog");
const usernameElem = document.getElementById("username");
const blogTitleElem = document.getElementById("blog-title");
const blogContentElem = document.getElementById("blog-content");
const sendBtn = document.getElementById("send-btn");

sendBtn.onclick = updateDB;

writeBlogContainer.style.display = "none";

const navLinks = document.querySelectorAll(".navbar ul li a");
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        if (link.getAttribute("href") === "#blog-list") {
            blogListContainer.style.display = "block";
            writeBlogContainer.style.display = "none";
        } else if (link.getAttribute("href") === "#write-blog") {
            blogListContainer.style.display = "none";
            writeBlogContainer.style.display = "block";
        }
    });
});

function updateDB(event) {
    event.preventDefault();

    const data = {
        USERNAME: usernameElem.value,
        TITLE: blogTitleElem.value,
        CONTENT: blogContentElem.value
    };

    database.push(data);

    blogTitleElem.value = "";
    blogContentElem.value = "";
}

database.on("child_added", addBlogToContainer);

function addBlogToContainer(rowData) {
    const data = rowData.val();
    let singleBlog = makeSingleBlogHTML(data.USERNAME, data.TITLE, data.CONTENT);
    blogListContainer.append(singleBlog);
}

function makeSingleBlogHTML(usernameTxt, titleTxt, contentTxt) {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("single-blog");

    let titleHeader = document.createElement("h2");
    titleHeader.classList.add("single-blog-title");
    titleHeader.innerHTML = titleTxt;
    parentDiv.appendChild(titleHeader);

    let usernameP = document.createElement("p");
    usernameP.classList.add("single-blog-username");
    usernameP.innerHTML = "By " + usernameTxt;
    parentDiv.appendChild(usernameP);

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("single-blog-content");
    contentDiv.innerHTML = contentTxt;
    parentDiv.appendChild(contentDiv);

    return parentDiv;
}
