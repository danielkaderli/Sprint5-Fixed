import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonObject;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.File;
import java.nio.file.Files;


public class ServerRouter {

    private int port;
    private final Gson gson = new Gson();
    private HttpServer server;

    private DatabaseFetcher database = new DatabaseFetcher();
    private AdjacencyList graph;
    public ServerRouter(int port){
        this.port = port;
        this.start();
    }
    public void setGraph (AdjacencyList graph){
        this.graph=graph;
    }
    public void start(){
        try{
            server = HttpServer.create(new InetSocketAddress(this.port), 0);
            server.createContext("/maprequest", new MapRequestHandler());
            server.createContext("images", new ImageHandler());
            server.start();
            System.out.println("Server is running on port "+ port);

        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

    public void shutdown(){
        if (server!=null){
            server.stop(0);
            System.out.println("Server has shut down");
        }
    }
     class ImageHandler implements HttpHandler{
        @Override
         public void handle(HttpExchange exchange) throws IOException{
            //Get image from request URI
            String uri = exchange.getRequestURI().toString();
            String fileName = uri.substring(uri.lastIndexOf('/')+1);

            //find file
            File file = new File("./build/resources/main/" +fileName);

            //respond with file
            if(file.exists() && file.isFile()){
                exchange.getResponseHeaders().set("Content-Type", Files.probeContentType(file.toPath()));
                exchange.sendResponseHeaders(200,file.length());

                OutputStream os = exchange.getResponseBody();
                Files.copy(file.toPath(), os);

                os.close();
            }
            //no file found, inform user
            else{
                String response = "File not found";
                exchange.sendResponseHeaders(404,response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
     }
     class MapRequestHandler implements HttpHandler{
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                //parse the request body
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                BufferedReader br = new BufferedReader(isr);
                String requestBody = br.readLine();

                JsonObject jsonBody = gson.fromJson(requestBody, JsonObject.class);
                //if the directions are requested, process best route and return
                if(jsonBody.has("Start")){
                    //get start and end
                    String startNode = jsonBody.get("start").getAsString();
                    String endNode = jsonBody.get("end").getAsString();
                    Node start = graph.findNode(Integer.parseInt(startNode));
                    Node end = graph.findNode(Integer.parseInt(endNode));

                    //create best path
                    PathGeneration pathCalc = new PathGeneration(start,end);
                    String currBestRoute= APIMethods.gsonify(pathCalc.createRoute(graph));

                    //create response
                    Map<String, Object> responseData= new HashMap<>();
                    responseData.put("message", "Success");
                    responseData.put("status", 200);
                    responseData.put("route", currBestRoute);
                    String response = gson.toJson(responseData);

                    //send response to requester
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200,response.getBytes().length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    }

                //if map requested, get building and floors and return
                else if (jsonBody.has("map")){
                        String graphFile= "./build/resources/main/";

                        //search database
                        String mapName = jsonBody.get("map").getAsString();
                        BuildingResult currBuilding = database.findBuilding(mapName);
                        ArrayList<FloorResult> buildingFloors = database.findFloors(mapName);

                        //create graph
                        graphFile +=currBuilding.GraphNodes();
                        graph.createGraph(graphFile);

                        //create response
                        Map<String, Object> responseData = new HashMap<>();
                        responseData.put("message", "Success");
                        responseData.put("status", 200);
                        responseData.put("Building Information", currBuilding);
                        responseData.put("Floors", buildingFloors);
                        String response = gson.toJson(responseData);

                        //send response to requester
                        exchange.getResponseHeaders().set("Content-Type", "application/json");
                        exchange.sendResponseHeaders(200,response.getBytes().length);
                        OutputStream os = exchange.getResponseBody();
                        os.write(response.getBytes());
                        os.close();
                }
            } else {
                // Method not allowed
                exchange.sendResponseHeaders(405, 0);
                OutputStream os = exchange.getResponseBody();
                os.close();
            }
        }
    }
}
