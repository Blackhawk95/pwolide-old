const { createClient } = require('@supabase/supabase-js');
const fetch = require('isomorphic-fetch')

const supabaseUrl = 'https://cjqcnyoufeeevygnkhqy.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


exports.handler = async (event, context) => {

    const no_of_images = 2;
    const img = Math.floor(Math.random() * no_of_images);
    const img_name = "pd_img" +  String(img) + ".jpg";
    //const url = new URL(img_name, "https://cjqcnyoufeeevygnkhqy.supabase.co/storage/v1/object/public/images/pd_img").href;
    const { data, error } = await supabase.storage.from('images').getPublicUrl(img_name);

    // https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
    console.log(data['publicURL'])
    let image
    if(data){
        const result = await fetch(data['publicURL'])
        image = await result.buffer()
    }

    console.log(error)

    return {
        statusCode: 200,
        headers: {
            'Content-type': 'image/jpeg'
          },
          body: await image.toString('base64'),
          isBase64Encoded: true
      };
}