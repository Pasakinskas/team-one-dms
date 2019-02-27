package com.dmsproject.dms.security;

import com.dmsproject.dms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
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

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, AccessDeniedException {

        /*
         * userService.loadById() should run with the user id from the jwt token
         */

        System.out.println("Filter encountered a request " + request.getMethod() + " " + request.getRequestURI());


        UserDetails userDetails = userService.loadUserById(1);


        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Authentication as = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication " + as);

        if (request.getRequestURI().equals("/testingdeny")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Test deny of entry");
        }

        try {
            filterChain.doFilter(request, response);
        } catch (ServletException e) {
            System.out.println("I fail at the authFilter");
            System.out.println(e);
        }
    }
}
