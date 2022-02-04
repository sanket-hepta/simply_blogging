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
var lastId = 6;

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
    lastId = lastBlog.blog_id + 1;
    return lastId;
}

function addBlogToList(blog){
    var blogDiv = document.getElementById("blog_list");
    if(blogDiv){
        let blog_html = '<div class="col-md-4"><div class="card border-0"><div class="card-body small-post-entry"><img class="card-img-top img-fluid" src="https://via.placeholder.com/800x514?text=Blog+Image"><div class="content align-self-center"><div class="post-meta mb-3"><span class="date">'+blog.date+'</span></div><h2 class="heading"><a href="#">'+blog.blog_title+'</a></h2><p>'+blog.blog_description+'</p><a href="#" class="post-author d-flex align-items-center"><div class="text"><strong>'+blog.author_name+'</strong></div></a></div></div></div></div>';
        blogDiv.insertAdjacentHTML('afterbegin', blog_html);
    }
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
        syncBlogs();
        showBlogTable();
        lastId++;

        document.getElementById("post_form").reset();
        $("#exampleModal").modal("hide");

        var success_element = document.getElementById("success_message");
        success_element.innerHTML = "Post added successfully.";
        success_element.classList.remove("d-none");
        setTimeout(function(){
            success_element.classList.add("d-none");
        }, 2000);
    }
}

function syncBlogs() {
    window.localStorage.setItem('blogList', JSON.stringify(blogList));
    blogList = JSON.parse(window.localStorage.getItem('blogList'));
}

function showBlogTable(){

    var table = '<table class="table table-striped w-100"><thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Description</th><th scope="col">Author</th><th scope="col">Date</th><th scope="col">Action</th></tr></thead><tbody>';

    if (!!blogList.length) {
        var j = 1;
        //for (var item in a) {
        for(var i = blogList.length-1; i >= 0; i--) {
            var blog = blogList[i];
            action = '<button onclick="load_edit_modal('+blog.blog_id+')" class="btn btn-success btn-sm"><i class="fa fa-pencil"></i></button><button onclick="delete_row('+blog.blog_id+')" class="btn btn-danger mt-1 btn-sm"><i class="fa fa-trash"></i></button>';
            table += '<tr id="'+blog.blog_id+'"><th scope="row">'+j+'.</th><td>'+blog.blog_title+'</td><td>'+blog.blog_description+'</td><td>'+blog.author_name+'</td><td>'+blog.date+'</td><td>'+action+'</td></tr>';
            j++;
        }
    }else{
        table += '<tr><td colspan="6">No post</td></tr>';
    }

    table += '</tbody></table>';

    document.getElementById("blog_table").innerHTML = table;
}

function load_edit_modal(blog_id){

    var blog = getBlogData(blog_id);

    if(blog){

        var id = document.getElementById("blog_id");
        var blog_title = document.getElementById("edit_blog_title");
        var blog_description = document.getElementById("edit_blog_description");
        var author_name = document.getElementById("edit_author_name");

        id.value = blog.blog_id;
        blog_title.value = blog.blog_title;
        blog_description.value = blog.blog_description;
        author_name.value = blog.author_name;

        $("#exampleModal1").modal("show");

    }
}

function edit_blog(){
    var id = document.getElementById("blog_id").value;
    var blog_title = document.getElementById("edit_blog_title").value;
    var blog_description = document.getElementById("edit_blog_description").value;
    var author_name = document.getElementById("edit_author_name").value;

    var k = null;
    for (var item in blogList) {
        if(blogList[item].blog_id == id){
            k = item;
            break;
        }
    }

    if(k != null){
        blogList[k].blog_title = blog_title;
        blogList[k].blog_description = blog_description;
        blogList[k].author_name = author_name;

        syncBlogs();
        showBlogTable();

        $("#exampleModal1").modal("hide");

        var success_element = document.getElementById("success_message");
        success_element.innerHTML = "Post updated successfully.";
        success_element.classList.remove("d-none");
        setTimeout(function(){
            success_element.classList.add("d-none");
        }, 2000);
    }else{
        var error_element = document.getElementById("edit_error_message");
        error_element.innerHTML = "Error to update post.";
        error_element.classList.remove("d-none");
        setTimeout(function(){
            error_element.classList.add("d-none");
        }, 5000);
    }
}

function getBlogData(blog_id){
    var k = null;
    for (var item in blogList) {
        if(blogList[item].blog_id == blog_id){
            k = item;
            break;
        }
    }

    if(k != null){
        return blogList[k];
    }
}

function delete_row(blog_id){
    
    var result = confirm("Are you sure you want to delete this row ?");
    if(result){
        blogList = removeByAttr(blogList, "blog_id", blog_id);
        syncBlogs();
        showBlogTable();
    }
}

function removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

function reverseArr(input) {
    var ret = new Array;
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

