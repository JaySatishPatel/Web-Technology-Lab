import java.io.*;
import java.sql.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ViewBooksServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM ebookshop");

            // ✅ FIX: Read all data first (NO beforeFirst)
            ArrayList<Map<String, Object>> books = new ArrayList<>();

            while (rs.next()) {
                Map<String, Object> book = new HashMap<>();
                book.put("id", rs.getInt("book_id"));
                book.put("title", rs.getString("book_title"));
                book.put("author", rs.getString("book_author"));
                book.put("price", rs.getDouble("book_price"));
                book.put("quantity", rs.getInt("quantity"));
                books.add(book);
            }

            // ===== HTML START =====
            out.println("<!DOCTYPE html>");
            out.println("<html><head><title>Books</title>");
            out.println("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>");
            out.println("</head><body class='container mt-4'>");

            out.println("<h2>📚 Books Inventory</h2><hr>");

            // ✅ Check after fetching
            if (books.isEmpty()) {
                out.println("<div class='alert alert-warning'>No Books Found</div>");
                out.println("<a href='addBook.html' class='btn btn-primary'>Add Book</a>");
            } else {

                out.println("<h5>Total Books: " + books.size() + "</h5>");

                out.println("<table class='table table-bordered table-hover'>");
                out.println("<thead class='table-dark'>");
                out.println("<tr>");
                out.println("<th>ID</th>");
                out.println("<th>Title</th>");
                out.println("<th>Author</th>");
                out.println("<th>Price</th>");
                out.println("<th>Quantity</th>");
                out.println("<th>Actions</th>");
                out.println("</tr>");
                out.println("</thead><tbody>");

                for (Map<String, Object> book : books) {
                    int id = (int) book.get("id");
                    String title = (String) book.get("title");
                    String author = (String) book.get("author");
                    double price = (double) book.get("price");
                    int quantity = (int) book.get("quantity");

                    out.println("<tr>");
                    out.println("<td>" + id + "</td>");
                    out.println("<td>" + escapeHtml(title) + "</td>");
                    out.println("<td>" + escapeHtml(author) + "</td>");
                    out.println("<td>$" + price + "</td>");
                    out.println("<td>" + quantity + "</td>");
                    out.println("<td>");
                    out.println("<a href='edit?id=" + id + "' class='btn btn-sm btn-primary'>Edit</a> ");
                    out.println("<a href='delete?id=" + id + "' class='btn btn-sm btn-danger'>Delete</a>");
                    out.println("</td>");
                    out.println("</tr>");
                }

                out.println("</tbody></table>");
            }

            out.println("<br><a href='addBook.html' class='btn btn-success'>Add New Book</a>");
            out.println("</body></html>");

        } catch (Exception e) {
            out.println("<h2>Error Loading Books</h2>");
            out.println("<p>" + escapeHtml(e.getMessage()) + "</p>");
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
    }
}