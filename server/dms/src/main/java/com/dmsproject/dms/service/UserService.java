package com.dmsproject.dms.service;

import com.dmsproject.dms.dao.RoleDAO;
import com.dmsproject.dms.dao.UserDAO;
import com.dmsproject.dms.dto.LoginData;
import com.dmsproject.dms.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class UserService implements UserDetails, UserDetailsService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * @param loginData the data entered by user on frontend
     * @return I set the password hash to null and return the user object
     */
    public User getUserWithAuth(LoginData loginData) {
        User user = userDAO.getUserByEmail(loginData.getEmail(), true);
        if (passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            user.setPassword(null);
            return user;
        } else {
            return null;
        }
    }

    public UserDetails loadUserById(int id) throws UsernameNotFoundException {
        User user = userDAO.getUserById(id, true);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthorities());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDAO.getUserByEmail(email, true);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthorities(user.getId()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        list.add(new SimpleGrantedAuthority("ROLE_USER"));
        return list;
    }

    public Collection<? extends GrantedAuthority> getAuthorities(int userid) {
        ArrayList<String> roles = roleDAO.getRolesByUserId(userid);

        final String ROLE_PREFIX = "ROLE_";
        List<GrantedAuthority> roleList = new ArrayList<GrantedAuthority>();
        for (String role : roles) {
            String preparedRole = ROLE_PREFIX + role.toUpperCase();
            roleList.add(new SimpleGrantedAuthority(preparedRole));
        }

        return roleList;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}