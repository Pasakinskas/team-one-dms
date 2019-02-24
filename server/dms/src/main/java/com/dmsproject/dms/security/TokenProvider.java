package com.dmsproject.dms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class TokenProvider {
    /**
     * Life is good. Just put Id on to the jwt. Andrius approves
     * @return
     */
    public String generateToken() {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject("what")
                .claim("bananas", "niceties")
                .signWith(SignatureAlgorithm.HS256, "mybunnies90SD")
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // add signing key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey("thiswillbesigningkey")
                .parseClaimsJws(token)
                .getBody();
    }
}
