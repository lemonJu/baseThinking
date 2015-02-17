module.exports = {
    "/test/1": function(request, response) {
        request.doGet(function(){
            response.getWriter().printConst("TEST")
        })
        request.doOther(function(){
            response.getWriter().printConst("TEST");
        })
    },
    "/test/2": function(request, response) {
        //response.getWriter().printConst("TEST");
        response.sendRedirect("http://www.baidu.com")
    }
}
