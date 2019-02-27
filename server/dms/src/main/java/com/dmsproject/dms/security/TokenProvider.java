package com.dmsproject.dms.security;

import com.dmsproject.dms.Constants;
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

    public String generateToken(int id) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject("userid")
                .claim("id", id)
                .signWith(SignatureAlgorithm.HS256, Constants.JWT_SIGN_KEY)
                .compact();
    }

    public String getSubjectFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public String getClaimFromToken(String token, String claimName) {
        return getAllClaimsFromToken(token).get(claimName).toString();
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // add signing key
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(Constants.JWT_SIGN_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
