import java.nio.file.Paths;
import java.sql.*;
import org.sqlite.JDBC;
public class DatabaseFetcher {
    private String baseUrl;
    private final String prefix="jdbc:sqlite:";
    private final String url;

    public String getURL(){return url;}

    public String findBuilding(String buildingID){
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        String sql = "SELECT * FROM Buildings WHERE BuildingID = ?";

        try (Connection conn = DriverManager.getConnection(prefix);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set the value for the parameter (BuildingID)
            pstmt.setString(1, buildingID);

            // Execute the query and get the result set
            ResultSet rs = pstmt.executeQuery();
            return rs.getString("GraphNodes");
        }catch (SQLException e){
            throw new RuntimeException();
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
