const Express = require('express'); // Import the Express module
const app = Express();          
const port = 8080; // Port number
const path = require('path');
const {v4: uuidv4} = require("uuid")
const methodOverride = require("method-override"); // using this for handling put and delete request

app.use(methodOverride('_method'))


let Post_data = [  // Assuming Database data
    {
       id: uuidv4(),
        username: 'Golu Singh',
        password: 'password123admin'
    },

    {
       id: uuidv4(),
        username: 'Krishna Singh',
        password: 'password123member'
    },
    {
      id: uuidv4(),
      username: 'Anand Jha',
      password: 'password123member'
  }

]
app.use(Express.json()); // Parse JSON bodies
app.use(Express.urlencoded({ extended: true })); // Parse URL-encoded bodies 

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(Express.static(path.join(__dirname, "public"))) // Serve static files from the public directory
//---------------------------------------------------------------------------------------------------------
 // Handling Requests
//---------------------------------------------------------------------------------------------------------

app.listen(port, () => { // Start the server
  console.log(`Server running on port ${port}`);
});



app.get("/post/new/:id", (req, res) => {  
  let {id} = req.params;
  let post = Post_data.find(post => post.id == id);
  console.log(id);
  if (!post) {
    return res.status(404).send("Post not found"); // Handle case where post is not found
  }
  res.render('show.ejs', {post}); // Pass the found post to the template
});

app.get('/post', (req, res) => { // Handle GET request
  res.render('index.ejs', {data:Post_data}); // Render the index.ejs file   
});



app.get('/post/new',(req,res)=> {
  res.render('new.ejs');
})

app.post('/post', (req, res) => {     // Handling post request // Taking data from client side 
  let {username, password} = req.body;
  let   id = uuidv4();
  Post_data.push({ id, username, password, });
  console.log(id);
  console.log(Post_data);
  res.redirect('/post');
})


app.patch("/post/:id", (req,res) => { //Taking data from client side to update data
  let {id} = req.params
  let NewPass = req.body.password
  console.log(`Your new Pass is ${NewPass }  `);
  console.log(id)
  let post = Post_data.find(post => post.id == id);
  post.password = NewPass;
  res.redirect("/post")
})

app.get("/post/new/:id/edit", (req,res) => {
  let {id} = req.params
  let post = Post_data.find(post => post.id == id);
  res.render("edit.ejs",{post})
})

app.delete("/post/:id", (req,res) => {  // deleting post 
  let {id} = req.params
   Post_data = Post_data.filter(post => post.id !== id);
  res.redirect("/post")
})
//-------------------------------------------------------------------------------------

let nums = [1,2,3,3];

for(let i = 0; i < nums.length; i++){
  for(let j = i+1; j < nums.length; j++){
    if(nums[i] == nums[j]){
      console.log(nums[i]);
      nums.splice(nums[j]);
      nums.push(j+1);
      console.log(nums);
    }
  }
}

