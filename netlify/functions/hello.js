exports.handler = async (event, context) => {

    function url_func() {
        const no_of_images = 2;
        const img = Math.floor(Math.random() * no_of_images);
        const img_name = "pd_img" +  String(img) + ".jpg";
        const url = new URL(img_name, "https://cjqcnyoufeeevygnkhqy.supabase.co/storage/v1/object/public/images/pd_img").href;
        return url;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ "url": url_func() }),
      };
  }