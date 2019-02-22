//package com.dmsproject.dms.service;
//
//import com.dmsproject.dms.dao.UserDAO;
//import com.dmsproject.dms.dto.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//@Service(value = "userService")
//public class UserServiceImpl implements UserDetailsService {
//
//    private UserDAO userDAO;
//
//    private BCryptPasswordEncoder bcryptEncoder;
//
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        User user = userDAO.getByEmail(email);
//        if(user == null){
//            throw new UsernameNotFoundException("Invalid username or password.");
//        }
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
//    }
//
//    private Set getAuthority(User user) {
//        Set authorities = new HashSet<>();
//        user.getRoles().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
//        });
//        return authorities;
//    }
//
//    public List findAll() {
//        List list = new ArrayList<>();
//        userDAO.findAll().iterator().forEachRemaining(list::add);
//        return list;
//    }
//}
