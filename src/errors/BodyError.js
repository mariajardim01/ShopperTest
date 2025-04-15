

function invalidBody(message) {
    return  {
        error_code: 'INVALID_DATA',
        error_description: message
    }
    
   
}

 function invalidType(){
    return {
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida"
    }
}

export default {
    invalidBody,
    invalidType
  };