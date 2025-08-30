import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/gemini.js";
const router = express.Router();

router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId : 456,
            title : "3rd chat"
        })

        const response = await thread.save();
        res.send(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to save in DB"});
    }
})

//get all threads
router.get("/thread", async (req, res) => {

    try{
        //descending order sorting threads acc to updated time -->
        let threads = await Thread.find({}).sort({updatedAt : -1});
        res.json(threads);
    }
    catch(err){
        res.status(500).json({error : "Some error occured"});
    }
})

//particular thread
router.get("/thread/:threadId", async (req, res) => {
    let {threadId} = req.params;
    try{
        const thread = await Thread.findOne({threadId});

        if(thread){
            res.json(thread.messages);
        }
        else{
            res.status(404).json({error : "Thread not found"});
        }
    }
    catch(err){
        res.send("Some error occured");
    }
    
})

router.delete("/thread/:threadId", async (req, res) => {
    let {threadId} = req.params;
    try{
        let thread = await Thread.findOneAndDelete({threadId});
        if(!thread){
            res.status(404).json({error : "Thread not found"});
        }
        res.status(200).json({success : "Thread deleted successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to delete the Thread"});
    }
})

router.post("/chat", async (req, res) => {
    let {threadId, message} = req.body;
    // Check if the message is valid before making the API call
    if (!message || message.trim() === "") {
        console.error("No message provided to Gemini API.");
        return null; // Return early or throw an error
    }

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){ //thread does not exist in DB
            //Create a new thread for new chat
            thread = new Thread({
                threadId,
                title : message,
                messages : [
                    {role : "user", content : message}
                ],
            })
        }
        else{
            //store the message in DB
            thread.messages.push({role : "user", content : message});
            thread.updatedAt = new Date();
        }

        let modelReply = await getGeminiAPIResponse(message);

        thread.messages.push({role : "model", content : modelReply});
        thread.updatedAt = new Date();

        await thread.save();
        console.log(modelReply);
        res.status(200).json({reply : modelReply});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "something went wrong"});
    }
})
export default router;