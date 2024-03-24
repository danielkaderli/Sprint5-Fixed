import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;

import org.sqlite.JDBC;

import static java.lang.Integer.parseInt;

public class DatabaseFetcher {
    private String baseUrl;
    private final String prefix="jdbc:sqlite:";
    private final String url;

    public String getURL(){return url;}

    public BuildingResult findBuilding(String buildingID){
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        String sql = "SELECT * FROM Buildings WHERE BuildingID = ?";

        try (Connection conn = DriverManager.getConnection(this.url);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set the value for the parameter (BuildingID)
            pstmt.setString(1, buildingID);

            // Execute the query and get the result set
            ResultSet rs = pstmt.executeQuery();
            return new BuildingResult(
                    rs.getString("BuildingID"),
                    rs.getString("GraphNodes"),
                    rs.getString("Contact"),
                    rs.getString("Address"));

        }catch (SQLException e){
            return null;
        }
    }

    public  ArrayList<FloorResult> findFloors(String buildingID){
        String sql = "SELECT * FROM Floors WHERE BuildingID = ?";
        ArrayList<FloorResult> floors = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(this.url);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set the value for the parameter (BuildingID)
            pstmt.setString(1, buildingID);


            // Execute the query and get the result set
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()){
                floors.add(new FloorResult(
                        rs.getString("BuildingID"),
                        parseInt(rs.getString("FloorNumber")),
                        rs.getString("FloorMap")));
            }
            return floors;
        }catch (SQLException e){
            return null;
        }

    }
    public DatabaseFetcher(){
        this.baseUrl="./build/resources/main/ChairQuest.db";
        this.baseUrl = Paths.get(System.getProperty("user.dir"),
                        Paths.get(this.baseUrl).getParent().toString())
                .resolve(Paths.get(this.baseUrl).getFileName())
                .normalize()
                .toAbsolutePath()
                .toString();
        this.url=this.prefix+this.baseUrl;
    }
    public DatabaseFetcher(String bURL){
        this.baseUrl=bURL;
        this.baseUrl=Paths.get(System.getProperty("user.dir"),
                        Paths.get(this.baseUrl).getParent().toString())
                .resolve(Paths.get(this.baseUrl).getFileName())
                .normalize()
                .toAbsolutePath()
                .toString();
        this.url=this.prefix+this.baseUrl;
    }
}
