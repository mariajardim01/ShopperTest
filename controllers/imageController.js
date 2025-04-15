import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import createTempUrlFromBase64 from "../services/urlImage.js";
import { postPicture, getMeasure, patchMeasure } from "../repositories/measureRepository.js";
import errors from '../errors/measureError.js'

dotenv.config();




  
export async function getResult(req, res, next) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

  try {
    const base64Image = req.body.image.replace(/^data:image\/\w+;base64,/, '');
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
      'retorne o valor na imagem, somente o número pfv ',
    ]);

    const imageValue = Number(result.response.text());
    const imageType = req.body.measure_type;
    const imageURL = createTempUrlFromBase64(req.body.image);
    const measureDatetime = req.body.measure_datetime

    const postResult = await postPicture(imageURL, imageValue, imageType, req.body.customer_code, measureDatetime);
    if (!postResult.success) {
      throw errors.doubleReport();
    }

    res.status(200).json({
      image_url: imageURL,
      measure_value: imageValue,
      measure_uuid: postResult.measure_uuid
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    next(error); 
  }
}

export async function PatchMeasure(req, res, next) {
  try {
    
    const measure = await getMeasure(req.body.measure_uuid);
    console.log(measure)
    
    if (measure.rows.length === 0) {
    
      throw errors.measureNotFound()

    }

    if (measure.rows[0].confirmed == true) {
         
        throw errors.duplicatedConfirm()
     
      }

    
    patchMeasure(req.body.confirmed_value, req.body.measure_uuid);
    
   
    return res.status(200).send({success: true});
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    next(error); 
  }
}