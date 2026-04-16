import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DeleteBookServlet extends HttpServlet {
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

        try {
            int bookId = Integer.parseInt(bookIdStr);
            conn = DBConnection.getConnection();
            String sql = "DELETE FROM ebookshop WHERE book_id = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, bookId);

            int result = pstmt.executeUpdate();

            if (result > 0) {
                out.println("<!DOCTYPE html>");
                out.println("<html lang=\"en\">");
                out.println("<head>");
                out.println("<meta charset=\"UTF-8\">");
                out.println("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
                out.println("<title>Book Deleted Successfully - BookStore</title>");
                out.println("<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\">");
                out.println("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">");
                out.println("<link rel=\"stylesheet\" href=\"css/style.css\">");
                out.println("</head>");
                out.println("<body>");

                // Navigation
                out.println("<nav class=\"navbar navbar-expand-lg navbar-dark\">");
                out.println("  <div class=\"container-fluid\">");
                out.println("    <a class=\"navbar-brand\" href=\"index.html\"><i class=\"fas fa-book\"></i> BookStore</a>");
                out.println("  </div>");
                out.println("</nav>");

                // Success Message
                out.println("<div class=\"container\" style=\"margin-top: 60px;\">");
                out.println("  <div class=\"card\" style=\"border: none; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); max-width: 600px; margin: 0 auto;\">");
                out.println("    <div class=\"card-body text-center p-5\">");
                out.println("      <div style=\"font-size: 4rem; color: #e74c3c; margin-bottom: 20px;\">");
                out.println("        <i class=\"fas fa-trash-alt\"></i>");
                out.println("      </div>");
                out.println("      <h2 class=\"card-title\" style=\"color: #2c3e50;\">Book Deleted Successfully!</h2>");
                out.println("      <p class=\"card-text text-muted\" style=\"font-size: 1.1rem; margin: 20px 0;\">");
                out.println("        The book with ID <strong>#" + bookId + "</strong> has been removed from your inventory.");
                out.println("      </p>");
                out.println("      <div class=\"mt-4\">");
                out.println("        <a href=\"books\" class=\"btn btn-primary btn-lg me-2\">");
                out.println("          <i class=\"fas fa-list\"></i> View All Books");
                out.println("        </a>");
                out.println("        <a href=\"addBook.html\" class=\"btn btn-success btn-lg\">");
                out.println("          <i class=\"fas fa-plus\"></i> Add Book");
                out.println("        </a>");
                out.println("      </div>");
                out.println("    </div>");
                out.println("  </div>");
                out.println("</div>");

                out.println("<footer style=\"background: #2c3e50; color: white; text-align: center; padding: 30px 20px; margin-top: 60px; border-top: 3px solid #3498db;\">");
                out.println("  <p style=\"margin: 0;\">&copy; 2024 BookStore Management System. All rights reserved.</p>");
                out.println("</footer>");

                out.println("<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"></script>");
                out.println("</body>");
                out.println("</html>");
            } else {
                out.println("<!DOCTYPE html><html><head><title>Error</title></head><body>");
                out.println("<h3>Error: Could not delete book!</h3>");
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
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
