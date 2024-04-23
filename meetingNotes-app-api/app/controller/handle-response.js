//For hadnling success message
export const setResponse = (responseData,response)=>{

    response.status(200);
    response.json(responseData);
   
}

//For handling Internal server error
export const setError = (error,response)=>{
    console.log(error);
    response.json({
        error: {
            code: 500,
            desc:"Internal server Error...."
        }
    });
}