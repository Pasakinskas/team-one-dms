package com.dmsproject.dms.security;

import com.dmsproject.dms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("Filter encountered a request " + request.getMethod() + " " + request.getRequestURI());
        String header = request.getHeader("token");

        if (header != null) {
            int userIdFromToken;
            try {
                String id = tokenProvider.getClaimFromToken(header, "id");
                userIdFromToken = Integer.parseInt(id);

                UserDetails userDetails = userService.loadUserById(userIdFromToken);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, id, userService.getAuthorities((Integer.parseInt(id))));
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                System.out.println("Error parsing the jwt token:");
                System.err.println(e);
            }
        } else {
            System.out.println("No token present in header");
        }

        try {
            filterChain.doFilter(request, response);
        } catch (ServletException e) {
            System.out.println("I fail at the authFilter");
            System.out.println(e);
        }
    }
}
