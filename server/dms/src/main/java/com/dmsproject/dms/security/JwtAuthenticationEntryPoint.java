package com.dmsproject.dms.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;

/**
 * Every bad request is treated as a 401
 * Should be 404 if no such route. TO DO
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
            throws IOException, ServletException {
        System.out.println("i got to the entry point");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
    }
}
