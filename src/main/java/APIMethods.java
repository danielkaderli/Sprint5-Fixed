import com.google.gson.Gson;

public class APIMethods {
    public APIMethods(){}
    //returns json string of any object type
    public static <T> String gsonify(T record){
        Gson gson = new Gson();
        return gson.toJson(record);
    }
    //need functions to receive jsons and convert them to usable information for backend
    //need function to pass image files
}
