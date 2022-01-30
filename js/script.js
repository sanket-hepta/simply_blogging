var blogList = [
    {
        "blog_id": 1,
        "blog_title": "Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Tamera Alexander",
        "date": "November 02, 2021"
    },
    {
        "blog_id": 2,
        "blog_title": "Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Bella Andre",
        "date": "November 20, 2021"
    },
    {
        "blog_id": 3,
        "blog_title": "Ask HN: Does Anybody Still Use JQuery?",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Daniel Arenson",
        "date": "November 25, 2021"
    },
    {
        "blog_id": 4,
        "blog_title": "Why Node.js Is The Coolest Kid On The Backend Development Block!",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Glynnis Campbell",
        "date": "December 05, 2021"
    },
    {
        "blog_id": 5,
        "blog_title": "CSS Float: A Tutorial",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Scott William Carter",
        "date": "December 26, 2021"
    },
    {
        "blog_id": 6,
        "blog_title": "Tell-A-Tool: Guide To Web Design And Development Tools",
        "blog_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "author_name": "Alyssa Cole",
        "date": "Jan 25, 2022"
    }
];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var lastId = 0;
var blogDiv = document.getElementById("blog_list");

document.addEventListener("DOMContentLoaded", function(event) {
    const name = localStorage.getItem("lms_username");
    
    if(name == 'null' || name == null){
        document.getElementById("login").innerHTML = "Login";
    }else{
        document.getElementById("login").innerHTML = "Logout";
        document.getElementById("login").href = "logout.html";
    }

    init();

});

function init(){
    if (!!(window.localStorage.getItem('blogList'))) {
        blogList = JSON.parse(window.localStorage.getItem('blogList'));
    }

    showList();
}

function showList(){
    if (!!blogList.length) {
        getLastBlogId();
        for (var item in blogList) {
            var blog = blogList[item];
            addBlogToList(blog);
        }
    }
}

function getLastBlogId(){
    var lastBlog = blogList[blogList.length - 1];
    lastId = lastBlog.blogId + 1;
}

function addBlogToList(blog){
    let blog_html = '<div class="col-md-4"><div class="card border-0"><div class="card-body small-post-entry"><img class="card-img-top img-fluid" src="https://via.placeholder.com/800x514?text=Blog+Image"><div class="content align-self-center"><div class="post-meta mb-3"><span class="date">'+blog.date+'</span></div><h2 class="heading"><a href="#">'+blog.blog_title+'</a></h2><p>'+blog.blog_description+'</p><a href="#" class="post-author d-flex align-items-center"><div class="text"><strong>'+blog.author_name+'</strong></div></a></div></div></div></div>';
    blogDiv.insertAdjacentHTML('afterbegin', blog_html);
}

function save_blog(){
    var blog_title = document.getElementById("blog_title").value;
    var blog_description = document.getElementById("blog_description").value;
    var author_name = document.getElementById("author_name").value;

    const d = new Date();

    if(blog_title != "" && blog_description != "" && author_name != ""){

        var blog = {
            "blog_id": lastId,
            "blog_title": blog_title,
            "blog_description": blog_description,
            "author_name": author_name,
            "date": monthNames[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()
        };

        blogList.push(blog);
        addBlogToList(blog);
        syncBlogs();
        lastId++;
        
        document.getElementById("blog_title").value = '';
        document.getElementById("blog_description").value = '';
        document.getElementById("author_name").value = '';
    }
}

function syncBlogs() {
    window.localStorage.setItem('blogList', JSON.stringify(blogList));
    blogList = JSON.parse(window.localStorage.getItem('blogList'));
}