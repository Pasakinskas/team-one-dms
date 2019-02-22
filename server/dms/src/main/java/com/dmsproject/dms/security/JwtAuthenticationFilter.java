package com.dmsproject.dms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;
    private JwtAuthenticationEntryPoint entryPoint;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        /*
         *  This code executes if the request is not disabled with the entryPoint.
         *  All requests go through here. This should run
         *  code for all documents and all routes. This
         *  place should not give you a token.
         */
        System.out.println("i have encountered a request" + request.getMethod() + request.getRequestURI());
        if (request.getRequestURI().equals("/loginsation")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Test deny of entry");
        }
        try {
            System.out.println(request);
            filterChain.doFilter(request, response);
        } catch (ServletException e) {
            System.out.println("I fail at the filter");
            System.out.println(e);
        }
    }

}
