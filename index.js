const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  mongoose.connect(
    "mongodb+srv://Aditya07:Aditya07@freeclusterdatabase.so6y5.mongodb.net/express_relationship"
  );
};

// Creating the User Schema:-

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//2. connecting the model of user with the userSchema.

const User = mongoose.model("user", userSchema); //=> user-- users

// All the routes of the User.
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send({ users: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.params.id).lean().exec();

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Creating the Post Schema

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = new mongoose.model("post", postSchema);

app.get("/posts", async (req, res) => {
  try {
    const post = await Post.find().lean().exec();

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});



// Creating the schema for Comment.

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref:"post", required: true },
  userId:{ type: mongoose.Schema.Types.ObjectId, ref:"user", required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/comments', async (req, res) => {

  try {
        const comment = await Comment.find().lean().exec();

        return res.status(200).send({comment:comment});
  } catch (error) {
    
    return res.status(500).send({error:error.message});
  }
});

app.post('/comments', async (req, res) => {
  try {
    
    const comment = await Comment.create(req.body);

    return res.status(201).send({comment:comment});
  } catch (error) {
    
    return res.status(500).send({error:error.message})
  }
});

app.get("/comments/:id", async (req, res)=>{
  
  try {
    const comment = await Comment.findById(req.params.id).lean().exec();

    return res.status(200).send({comment:comment});

  } catch (error) {
    
    return res.status(500).send({error:error.message})
  }
});

app.patch("/comments/:id", async (req, res)=>{

  try {
    
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true})

    return res.status(200).send({comment:comment});

  } catch (error) {
    
    return res.status(500).send({error:error.message});
  }
});

app.delete("/comments/:id", async (req,res)=>{

  try {
     
    const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({comment: comment});
  } catch (error) {
    
    return res.status(500).send({error: error.message})
  }
})

app.listen(5000, async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }
  console.log("Listening on port 5000");
});
