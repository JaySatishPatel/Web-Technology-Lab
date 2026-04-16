import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class EditBookServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String bookIdStr = request.getParameter("id");
        
        if (bookIdStr == null || bookIdStr.trim().isEmpty()) {
            out.println("<!DOCTYPE html><html><head><title>Error</title></head><body>");
            out.println("<h3>Error: Book ID is required!</h3>");
            out.println("<a href='books'>Go Back</a>");
            out.println("</body></html>");
            return;
        }

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            int bookId = Integer.parseInt(bookIdStr);
            conn = DBConnection.getConnection();
            String sql = "SELECT * FROM ebookshop WHERE book_id = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, bookId);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                int id = rs.getInt("book_id");
                String title = rs.getString("book_title");
                String author = rs.getString("book_author");
                double price = rs.getDouble("book_price");
                int quantity = rs.getInt("quantity");

                out.println("<!DOCTYPE html>");
                out.println("<html lang=\"en\">");
                out.println("<head>");
                out.println("<meta charset=\"UTF-8\">");
                out.println("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
                out.println("<title>Edit Book - BookStore</title>");
                out.println("<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\">");
                out.println("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">");
                out.println("<link rel=\"stylesheet\" href=\"css/style.css\">");
                out.println("<style>");
                out.println(".form-section { max-width: 600px; margin: 40px auto; }");
                out.println(".button-group { display: flex; gap: 10px; margin-top: 25px; }");
                out.println(".button-group button { flex: 1; }");
                out.println(".input-group-text { background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; border: none; }");
                out.println("</style>");
                out.println("</head>");
                out.println("<body>");

                // Navigation Bar
                out.println("<nav class=\"navbar navbar-expand-lg navbar-dark\">");
                out.println("  <div class=\"container-fluid\">");
                out.println("    <a class=\"navbar-brand\" href=\"books\">");
                out.println("      <i class=\"fas fa-book\"></i> BookStore");
                out.println("    </a>");
                out.println("    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarNav\">");
                out.println("      <span class=\"navbar-toggler-icon\"></span>");
                out.println("    </button>");
                out.println("    <div class=\"collapse navbar-collapse\" id=\"navbarNav\">");
                out.println("      <ul class=\"navbar-nav ms-auto\">");
                out.println("        <li class=\"nav-item\">");
                out.println("          <a class=\"nav-link active\" href=\"books\"><i class=\"fas fa-list\"></i> View Books</a>");
                out.println("        </li>");
                out.println("        <li class=\"nav-item\">");
                out.println("          <a class=\"nav-link\" href=\"addBook.html\"><i class=\"fas fa-plus-circle\"></i> Add Book</a>");
                out.println("        </li>");
                out.println("      </ul>");
                out.println("    </div>");
                out.println("  </div>");
                out.println("</nav>");

                // Breadcrumb
                out.println("<div class=\"container\">");
                out.println("  <nav class=\"breadcrumb-custom\" aria-label=\"breadcrumb\" style=\"padding: 20px 0;\">");
                out.println("    <ol class=\"breadcrumb\">");
                out.println("      <li class=\"breadcrumb-item\"><a href=\"books\"><i class=\"fas fa-list\"></i> Books</a></li>");
                out.println("      <li class=\"breadcrumb-item active\" aria-current=\"page\"><i class=\"fas fa-edit\"></i> Edit Book</li>");
                out.println("    </ol>");
                out.println("  </nav>");
                out.println("</div>");

                // Form
                out.println("<div class=\"container form-section\">");
                out.println("  <div class=\"card\">");
                out.println("    <div class=\"card-header\">");
                out.println("      <h4 class=\"mb-0\"><i class=\"fas fa-edit\"></i> Edit Book #" + id + "</h4>");
                out.println("    </div>");
                out.println("    <div class=\"card-body p-5\">");
                out.println("      <form action=\"update\" method=\"post\" id=\"editBookForm\" novalidate>");
                out.println("        <input type=\"hidden\" name=\"id\" value=\"" + id + "\">");

                out.println("        <div class=\"mb-3\">");
                out.println("          <label for=\"title\" class=\"form-label\"><i class=\"fas fa-book\"></i> Book Title *</label>");
                out.println("          <input type=\"text\" id=\"title\" name=\"title\" class=\"form-control\" placeholder=\"Enter book title\" value=\"" + escapeHtml(title) + "\" required>");
                out.println("          <div class=\"form-text\">The title of the book</div>");
                out.println("        </div>");

                out.println("        <div class=\"mb-3\">");
                out.println("          <label for=\"author\" class=\"form-label\"><i class=\"fas fa-pen\"></i> Author *</label>");
                out.println("          <input type=\"text\" id=\"author\" name=\"author\" class=\"form-control\" placeholder=\"Enter author name\" value=\"" + escapeHtml(author) + "\" required>");
                out.println("          <div class=\"form-text\">The author of the book</div>");
                out.println("        </div>");

                out.println("        <div class=\"row\">");
                out.println("          <div class=\"col-md-6 mb-3\">");
                out.println("            <label for=\"price\" class=\"form-label\"><i class=\"fas fa-dollar-sign\"></i> Price *</label>");
                out.println("            <div class=\"input-group\">");
                out.println("              <span class=\"input-group-text\">$</span>");
                out.println("              <input type=\"number\" id=\"price\" name=\"price\" class=\"form-control\" placeholder=\"0.00\" step=\"0.01\" min=\"0\" value=\"" + price + "\" required>");
                out.println("            </div>");
                out.println("            <div class=\"form-text\">Price in USD</div>");
                out.println("          </div>");

                out.println("          <div class=\"col-md-6 mb-3\">");
                out.println("            <label for=\"qty\" class=\"form-label\"><i class=\"fas fa-boxes\"></i> Quantity *</label>");
                out.println("            <div class=\"input-group\">");
                out.println("              <input type=\"number\" id=\"qty\" name=\"qty\" class=\"form-control\" placeholder=\"0\" min=\"0\" value=\"" + quantity + "\" required>");
                out.println("              <span class=\"input-group-text\">Units</span>");
                out.println("            </div>");
                out.println("            <div class=\"form-text\">Number of books in stock</div>");
                out.println("          </div>");
                out.println("        </div>");

                out.println("        <div class=\"button-group\">");
                out.println("          <button type=\"submit\" class=\"btn btn-success btn-lg\">");
                out.println("            <i class=\"fas fa-save\"></i> Update Book");
                out.println("          </button>");
                out.println("          <button type=\"reset\" class=\"btn btn-secondary btn-lg\">");
                out.println("            <i class=\"fas fa-redo\"></i> Reset");
                out.println("          </button>");
                out.println("        </div>");

                out.println("        <div class=\"mt-4 pt-3 border-top\">");
                out.println("          <a href=\"books\" class=\"btn btn-primary me-2\">");
                out.println("            <i class=\"fas fa-arrow-left\"></i> Back to Books List");
                out.println("          </a>");
                out.println("          <a href=\"addBook.html\" class=\"btn btn-success\">");
                out.println("            <i class=\"fas fa-plus-circle\"></i> Add New Book");
                out.println("          </a>");
                out.println("        </div>");
                out.println("      </form>");
                out.println("    </div>");
                out.println("  </div>");
                out.println("</div>");

                // Footer
                out.println("<footer style=\"background: #2c3e50; color: white; text-align: center; padding: 30px 20px; margin-top: 60px; border-top: 3px solid #3498db;\">");
                out.println("  <p style=\"margin: 0;\">&copy; 2024 BookStore Management System. All rights reserved.</p>");
                out.println("</footer>");

                out.println("<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"></script>");
                out.println("<script>");
                out.println("document.getElementById('editBookForm').addEventListener('submit', function(e) {");
                out.println("  if (!this.checkValidity()) {");
                out.println("    e.preventDefault();");
                out.println("    e.stopPropagation();");
                out.println("  }");
                out.println("  this.classList.add('was-validated');");
                out.println("});");
                out.println("</script>");
                out.println("</body>");
                out.println("</html>");
            } else {
                out.println("<!DOCTYPE html><html><head><title>Error</title></head><body>");
                out.println("<h3>Error: Book not found!</h3>");
                out.println("<a href='books'>Go Back</a>");
                out.println("</body></html>");
            }

        } catch (NumberFormatException e) {
            out.println("<!DOCTYPE html><html><head><title>Error</title></head><body>");
            out.println("<h3>Error: Invalid Book ID!</h3>");
            out.println("<a href='books'>Go Back</a>");
            out.println("</body></html>");
        } catch (ClassNotFoundException | SQLException e) {
            out.println("<!DOCTYPE html><html><head><title>Error</title></head><body>");
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
            out.println("<a href='books'>Go Back</a>");
            out.println("</body></html>");
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    // Helper method to escape HTML special characters
    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
    }
}
