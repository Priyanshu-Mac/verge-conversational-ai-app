import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
    const options = {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "X-goog-api-key": `${process.env.GEMINI_API_KEY}`
    },
    body : JSON.stringify({
      contents : [
        {
          parts : [
            {
              "text" : message,
            }
          ]
        }
      ]
    })
  }

  try{
    let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", options);
    let data = await response.json();

    console.log(data);
    return data.candidates[0].content.parts[0].text;
    
  }
  catch(err){
    console.log(err);
  }
}
  
export default getGeminiAPIResponse;